const Poin = require('../models/poin');
const User = require('../models/user')

const getHistoryPoinById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('historypoint')
        // res.status(200).send(user.historypoint.sort((a, b) => b.start_date - a.start_date));
        res.status(200).json({
            message: 'success',
            historyPoint: user.historypoint
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

// const postHistoryPoinById = async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         // Buat menyimpan poin baru
//         const newPoin = new Poin(req.body);
//         // Berdasarkan user Id
//         const user = await User.findById(userId);
//         // menetapkan db poin sebagai pengguna di db user
//         newPoin.pengguna = user;
//         // menyimpan poin
//         await newPoin.save();
//         // menambahkan db user di field sebagai new poin
//         user.historypoint.push(newPoin);
//         // simpan user
//         await user.save();
//         res.status(201).json({
//             message: 'success',
//         })
        
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }



const postHistoryPoinById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { point_min, status } = req.body;

        const findById = await User.findById(userId);

        if(findById.point < point_min){
            res.status(400).json({message: 'Point tidak mencukupi'});
        }else {
            const calculatePoin = findById.point - point_min;
    
            const updatePoint = await User.findByIdAndUpdate(userId, {
                point: calculatePoin,
            })
    
            // Buat menyimpan poin baru
            const newPoin = new Poin({
                point_min,
                status,
            });
            // Berdasarkan user Id
            const user = await User.findById(userId);
            // menetapkan db poin sebagai pengguna di db user
            newPoin.pengguna = user;
            // menyimpan poin
            await newPoin.save();
            // menambahkan db user di field sebagai new poin
            user.historypoint.push(newPoin);
            // simpan user
            await user.save();
            res.status(201).json({
                message: 'success',
            })
            
            
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {getHistoryPoinById, 
    postHistoryPoinById,
}
