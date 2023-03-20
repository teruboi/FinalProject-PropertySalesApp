const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const { v4: uuidv4, v1: uuidv1 } = require('uuid');
const { check, validationResult } = require('express-validator')
const multer = require('multer')
const upload = multer({ dest: '../server/public/photos' })

const router = express.Router();
const prisma = new PrismaClient();

router.get('/product/:prop_id', async (req, res) => {
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
        res.json({error: err})   
    }
});

router.post('/product/create', [
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
        .custom((req) => {
            if(!req.file){
                throw new Error('Foto harus diisi minimal satu (1)')
            }
        }),
    check('prop_type')
        .notEmpty().withMessage('Harus diisi'),
    check('prop_sale')
        .notEmpty().withMessage('Harus diisi'),
    upload.array('prop-photos', 12)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array()});
    }
    const formData = req.body
    console.log(formData);

    const specialCode = formData.prop_type.slice(0, 3)
    const specialCode2 = uuidv4().split('-')[0]
    
    const prop_id = specialCode + specialCode2
    let newProp = Prisma.UserCreateInput

    let photos = req.files.forEach(async (e, i) => {
        photos[i] = e.filename
    });

    if (prop_type === 'tanah') {
        newProp = {
            prop_name: formData.propName,
            price: formData.price,
            prop_prov: formData.propProv,
            prop_city: formData.propCity,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: formData.propType,
                    lt: formData.lt,
                    description: formData.desc,
                    prop_sale: formData.saleType,
                    cert: formData.cert
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
                    name: faker.name.fullName(),
                    nik: faker.random.numeric(16),
                    phone: faker.phone.number('+628##########'),
                    addr: faker.address.streetAddress(true),
                    id: faker.datatype.uuid()
                }
            }
        }
    }
    else {
        newProp = {
            prop_name: faker.random.words(3),
            price: faker.datatype.number({min: 10, max: 1000})*1000000,
            prop_prov: faker.address.county(),
            prop_city: faker.address.cityName(),
            available: true,
            id: prop_id,
            prop_detail: {
                create: {
                    prop_type: prop_type,
                    lt: faker.datatype.number({min: 10, max: 500}),
                    description: faker.lorem.paragraph(5),
                    lb: faker.datatype.number({min: 10, max: 500}),
                    km: faker.datatype.number({min: 0, max: 5}),
                    kt: faker.datatype.number({min: 0, max: 5}),
                    floor: faker.datatype.number({min: 1, max: 4}),
                    cert: cert,
                    power: (faker.datatype.number({min: 1, max: 10})*1000),
                    carport: faker.datatype.number({min: 0, max: 3}),
                    garage: faker.datatype.number({min: 0, max: 3}),
                    condition: faker.datatype.boolean() ? "baru" : "bekas",
                    facing: faker.address.cardinalDirection(true),
                    year: faker.date.past(10).getUTCFullYear(),
                    furniture: faker.datatype.boolean() ? "furnished" : "unfurnished",
                    prop_sale: prop_sale
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
                    name: faker.name.fullName(),
                    nik: faker.random.numeric(16),
                    phone: faker.phone.number('+628##########'),
                    addr: faker.address.streetAddress(true),
                    id: faker.datatype.uuid()
                }
            }
        }
    }

    const newProduct = await prisma.property_list.create({
        data: newProp
    })

    res.json(newProduct)
})

router.put('/product/:prop_id',
    [
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
    ]
    ,async (req, res) => {
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

router.delete('/product/delete/:prop_id', async (req, res) => {
    try {
        const deleted = await prisma.property_list.delete({
            where: {
                id: req.params.prop_id
            }
        })
    
        res.json('Property succesfully deleted')
    } catch (err) {
        res.json({error: err})
    }
})

module.exports = router