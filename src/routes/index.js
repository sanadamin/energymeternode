import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import devision from '../controller/devision'
import owner from '../controller/owner'
import ownerdivisions from '../controller/ownerdivision'
import devisionrecord from '../controller/devisionrecord'
import energy from '../controller/energy'
let router = express();

// connect to db
initializeDb(db => {


    // internal middleware
    router.use(middleware({ config, db }));

    // api routes v1 (/v1)
    // router.use('/foodtruck', foodtruck({ config, db }));
    // router.use('/account', account({ config, db }));
    // router.use('/sites', sites({ config, db }));
    // router.use('/emp', employee({ config, db }));
    // router.use('/task', task({ config, db }));
    // router.use('/taskapproval', taskapproval({ config, db }));
    // router.use('taskname', taskname({ config, db }));
    router.use('/energy', energy({ config, db }));
    router.use('/devision', devision({ config, db }));
    router.use('/owner', owner({ config, db }));
    router.use('/ownerdivision', ownerdivisions({ config, db }));
    router.use('/devisionrecord', devisionrecord({ config, db }));
    // router.use('/record',record({config,db}));
});

export default router;