const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const { v4: uuidv4, v1: uuidv1 } = require('uuid');
const { check, validationResult } = require('express-validator')
const multer = require('multer')
const { checkFileType } = require('../middleware/validator')

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/photos")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})


const router = express.Router();
const prisma = new PrismaClient();

router.get('/product/:prop_id', async(req, res) => {
    try {
        const product = await prisma.property_list.findUniqueOrThrow({
            where: {
                id: req.params.prop_id
            },
            include: {
                prop_detail: true,
                photos: true,
                owner: true
            }
        })

        res.json(product)
    } catch (err) {
        res.json({ error: err })
    }
});

router.post('/product/create', [
    upload.fields([{ name: 'photos', maxCount: 12 }]),
    // check('propName')
    // .notEmpty().withMessage('Harus diisi')
    // .isString()
    // .isLength({ min: 15, max: 70 }).withMessage('Jumlah karakter tidak sesuai'),
    // check('price')
    // .notEmpty().withMessage('Harus diisi')
    // .isInt().withMessage('Format tidak sesuai'),
    // check('propProv')
    // .notEmpty().withMessage('Harus diisi'),
    // check('propCity')
    // .notEmpty().withMessage('Harus diisi'),
    // check('lt')
    // .notEmpty().withMessage('Harus diisi')
    // .isInt().withMessage('Format tidak sesuai'),
    // check('lb')
    // .default(0)
    // .isInt().withMessage('Format tidak sesuai'),
    // check('ownerName')
    // .notEmpty().withMessage('Harus diisi'),
    // check('ownerNIK')
    // .notEmpty().withMessage('Harus diisi'),
    // check('ownerPhone')
    // .notEmpty().withMessage('Harus diisi')
    // .isMobilePhone('id-ID').withMessage('Format nomor telepon harus Indonesia'),
    // check('ownerAddr')
    // .notEmpty().withMessage('Harus diisi')
    // .isString(),
    // check('description')
    // .notEmpty().withMessage('Harus diisi')
    // .isString()
    // .isLength({ min: 20, max: 4000 }).withMessage('Jumlah karakter tidak sesuai'),
    // check('photos')
    // .custom((req) => {
    //     if (!req.files) {
    //         throw new Error('Foto harus diisi minimal satu (1)')
    //     }

    //     if (req.files.length < 3) {
    //         throw new Error('Foto kurang dari batas minimal')
    //     }
    // }),
    // check('propType')
    // .notEmpty().withMessage('Harus diisi'),
    // check('propSale')
    // .notEmpty().withMessage('Harus diisi')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({ errors: errors.array() });
    }
    const formData = req.body
    console.log(formData);

    const specialCode = formData.propType.slice(0, 3)
    const specialCode2 = uuidv4().split('-')[0]

    const prop_id = specialCode + specialCode2
    let newProp = Prisma.UserCreateInput

    console.log(req.files)
    let photos = []
    if (req.files) {
        const file = req.files.photos
        photos = file.map(async(e, i) => {
            console.log(e.path);
            photos[i] = e.path
        });
    } else {
        throw new Error("photos not found")
    }


    if (formData.propType === 'tanah') {
        newProp = {
            prop_name: formData.propName,
            price: parseInt(formData.price),
            prop_prov: formData.propProv,
            prop_city: formData.propCity,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: formData.propType,
                    lt: parseInt(formData.lt),
                    description: formData.desc,
                    prop_sale: formData.propSale,
                    cert: formData.cert
                }
            },
            photos: {
                create: {
                    image: req.files.photos
                }
            },
            // agent: {
            //     connect: {
            //         agent_id: req.session
            //     }
            // },
            owner: {
                create: {
                    name: formData.ownerName,
                    nik: formData.ownerNIK,
                    phone: formData.ownerName,
                    addr: formData.ownerAddr,
                }
            }
        }
    } else {
        newProp = {
            prop_name: formData.propName,
            price: parseInt(formData.price),
            prop_prov: formData.propProv,
            prop_city: formData.propCity,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: formData.propType,
                    lt: parseInt(formData.lt),
                    description: formData.desc,
                    prop_sale: formData.propSale,
                    cert: formData.cert,
                    lb: parseInt(formData.lb),
                    km: parseInt(formData.km),
                    kt: parseInt(formData.kt),
                    floor: parseInt(formData.floor),
                    power: parseInt(formData.power),
                    carport: parseInt(formData.carport),
                    garage: parseInt(formData.garage),
                    condition: formData.condition,
                    facing: formData.facing,
                    year: parseInt(formData.year),
                    furniture: formData.furniture,
                }
            },
            photos: {
                create: {
                    image: photos
                }
            },
            agent: {
                connect: {
                    agent_id: "82bd8e20-5045-4a17-8cee-8552b5e3c3db"
                }
            },
            owner: {
                create: {
                    name: formData.ownerName,
                    nik: formData.ownerNIK,
                    phone: formData.ownerName,
                    addr: formData.ownerAddr,
                }
            }
        }
    }

    const newProduct = await prisma.property_list.create({
        data: newProp
    })

    console.log(newProduct)
})

router.put('/product/:prop_id', [
    upload.array('prop-photos', 12),
    check('prop_name')
    .notEmpty().withMessage('Harus diisi')
    .isString()
    .isLength({ min: 15, max: 70 }).withMessage('Jumlah karakter tidak sesuai'),
    check('price')
    .notEmpty().withMessage('Harus diisi')
    .isInt().withMessage('Format tidak sesuai'),
    check('prop_prov')
    .notEmpty().withMessage('Harus diisi'),
    check('prop_city')
    .notEmpty().withMessage('Harus diisi'),
    check('lt')
    .notEmpty().withMessage('Harus diisi')
    .isInt().withMessage('Format tidak sesuai'),
    check('lb')
    .default(0)
    .isInt().withMessage('Format tidak sesuai'),
    check('ownerName')
    .notEmpty().withMessage('Harus diisi'),
    check('ownerNIK')
    .notEmpty().withMessage('Harus diisi'),
    check('ownerPhone')
    .notEmpty().withMessage('Harus diisi')
    .isMobilePhone('id-ID').withMessage('Format nomor telepon harus Indonesia'),
    check('ownerAddr')
    .notEmpty().withMessage('Harus diisi')
    .isString(),
    check('description')
    .notEmpty().withMessage('Harus diisi')
    .isString()
    .isLength({ min: 20, max: 4000 }).withMessage('Jumlah karakter tidak sesuai'),
    check('photos')
    .notEmpty().withMessage('Harus diisi'),
    check('prop_type')
    .notEmpty().withMessage('Harus diisi'),
    check('prop_sale')
    .notEmpty().withMessage('Harus diisi')
], async(req, res) => {
    try {
        const data = await req.body

        await prisma.property_list.update({
            where: {
                prop_id: req.params.prop_id
            },

            data: {
                prop_name: data.prop_name,
                price: data.price,
                prop_prov: data.prop_prov,
                prop_city: data.prop_city,
                available: true,
                prop_detail: {
                    update: {
                        prop_type: data.prop_type,
                        lt: data.lt,
                        lb: data.lb,
                        km: data.km,
                        kt: data.kt,
                        floor: data.floor,
                        cert: data.cert,
                        power: data.power,
                        carport: data.carport,
                        garage: data.garage,
                        condition: data.condition,
                        facing: data.facing,
                        year: data.year,
                        furniture: data.furniture,
                        description: data.description,
                        prop_sale: data.prop_sale,
                        owner: {
                            update: {
                                name: data.ownerName,
                                nik: data.ownerNIK,
                                phone: data.ownerPhone,
                                addr: data.ownerAddr
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

router.delete('/product/delete/:prop_id', async(req, res) => {
    try {
        const deleted = await prisma.property_list.delete({
            where: {
                id: req.params.prop_id
            }
        })

        res.json('Property succesfully deleted')
    } catch (err) {
        res.json({ error: err })
    }
})

module.exports = router