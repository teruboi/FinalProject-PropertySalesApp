const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const { v4: uuidv4, v1: uuidv1 } = require('uuid');
const { check, validationResult } = require('express-validator')
const { multer } = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/photos')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv1)
    }
})
const upload = multer({ storage: storage })

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:prop_id', async (req, res) => {
    const product = await prisma.prop_detail.findUniqueOrThrow({
        where: {
            prop_id: req.params.prop_id
        },
        include: {
            property_list: true
        }
    })

    res.json(product)
});

router.post('/create', [
    check('prop_name')
        .notEmpty().withMessage('Nama properti harus diisi')
        .isString()
        .isLength({ min: 15, max: 70 }).withMessage('Jumlah karakter tidak sesuai'),
    check('price')
        .notEmpty().withMessage('Harga harus diisi')
        .isInt().withMessage('Format tidak sesuai'),
    check('prop_prov')
        .notEmpty().withMessage('Provinsi harus diisi'),
    check('prop_city')
        .notEmpty.withMessage('Kota / Kabupaten harus diisi'),
    check('lt')
        .notEmpty().withMessage('Luas tanah harus diisi')
        .isInt().withMessage('Format tidak sesuai'),
    check('lb')
        .default(0)
        .isInt().withMessage('Format tidak sesuai')
        .notEmpty().withMessage('Luas bangunan harus diisi'),
    check('ownerName')
        .notEmpty().withMessage('Nama owner harus diisi'),
    check('ownerNIK')
        .notEmpty().withMessage('NIK harus diisi'),
    check('ownerPhone')
        .notEmpty().withMessage('Nomor telepon owner harus diisi')
        .isMobilePhone('id-ID').withMessage('Format nomor telepon harus Indonesia'),
    check('ownerAddr')
        .notEmpty().withMessage('Alamat owner harus diisi')
        .isString(),
    check('description')
        .notEmpty().withMessage('Deskripsi harus diisi')
        .isString()
        .isLength({ min: 20, max: 4000 }).withMessage('Jumlah karakter tidak sesuai'),
    check('photos')
        .notEmpty().withMessage('Foto harus diisi'),
    check('prop_type')
        .notEmpty().withMessage('Jenis properti harus diisi'),
    upload.array('prop-photos', 12)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const formData = await req.body

    const specialCode = formData.prop_type.slice(0, 3)
    const specialCode2 = uuidv4().split('-')[0]
    
    const prop_id = specialCode + specialCode2
    let newProp = Prisma.UserCreateInput

    let photos = req.files.forEach(async (e, i) => {
        return ({
            image_id: e[i].path,
            prop_id: prop_id,
            image: e[i].filename
        })
    });

    if (formData.prop_type === 'tanah') {
        newProp = {
            prop_name: formData.prop_name,
            price: formData.price,
            prop_prov: formData.prop_prov,
            prop_city: formData.prop_city,
            available: true,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: formData.prop_type,
                    lt: formData.lt,
                    description: formData.description,
                    prop_sale: formData.prop_sale,
                    owner: {
                        create: {
                            name: formData.ownerName,
                            nik: formData.ownerNIK,
                            phone: formData.ownerPhone,
                            addr: formData.ownerAddr
                        }
                    },
                    photos: {
                        create: photos
                    }
                }
            }
        }
    }
    else {
        newProp = {
            prop_name: formData.prop_name,
            price: formData.price,
            prop_prov: formData.prop_prov,
            prop_city: formData.prop_city,
            available: true,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: formData.prop_type,
                    lt: formData.lt,
                    lb: formData.lb,
                    km: formData.km,
                    kt: formData.kt,
                    floor: formData.floor,
                    cert: formData.cert,
                    power: formData.power,
                    carport: formData.carport,
                    garage: formData.garage,
                    condition: formData.condition,
                    facing: formData.facing,
                    year: formData.year,
                    furniture: formData.furniture,
                    description: formData.description,
                    prop_sale: formData.prop_sale,
                    owner: {
                        create: {
                            name: formData.ownerName,
                            nik: formData.ownerNIK,
                            phone: formData.ownerPhone,
                            addr: formData.ownerAddr
                        }
                    },
                    photos: {
                        create: photos
                    }
                }
            }
        }
    }

    const newProduct = await prisma.property_list.create({
        data: newProp
    })
})

router.get('/:prop_id/edit', async (req, res) => {
    const product = await prisma.property_list.findUnique({
        where: {
            prop_id: req.params.prop_id
        },
        include: {
            prop_detail: true,
            photos: true,
        }
    })

    res.json(product);
})

router.put('/:prop_id', upload.array('prop-photos', 12),async (req, res) => {
    try {
        const data = await req.body

        await prisma.property_list.update({
            where: {
                prop_id: req.params.prop_id
            },

            data: {
                prop_name: body.prop_name,
                price: body.price,
                prop_prov: body.prop_prov,
                prop_city: body.prop_city,
                available: true,
                prop_detail: {
                    update: {
                        prop_type: body.prop_type,
                        lt: body.lt,
                        lb: body.lb,
                        km: body.km,
                        kt: body.kt,
                        floor: body.floor,
                        cert: body.cert,
                        power: body.power,
                        carport: body.carport,
                        garage: body.garage,
                        condition: body.condition,
                        facing: body.facing,
                        year: body.year,
                        furniture: body.furniture,
                        description: body.description,
                        prop_sale: body.prop_sale,
                        owner: {
                            update: {
                                name: body.ownerName,
                                nik: body.ownerNIK,
                                phone: body.ownerPhone,
                                addr: body.ownerAddr
                            }
                        },
                        photos: {
                            update: photos
                        }
                    }
                }
            }
        })

        
    } catch (err) {
        console.error(err);
        res.sendStatus(500).json({ error: err });
    }
})

module.exports = router