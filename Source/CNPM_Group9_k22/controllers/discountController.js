const discountModel = require('../models/discountModel');

const renderPromotions = async (req, res) => {
    try {
        const promotions = await discountModel.getPromotions({});
        res.render('discounts/Discount', {
            promotions
        });
    } catch (error) {
        console.error("Error fetching promotions:", error);
        res.status(500).send("Internal Server Error");
    }
};

const addPromotion = async (req, res) => {
    try {
        const newPromo = req.body;
        newPromo.discount_id = `D${Date.now()}`; // Generate a unique discount_id
        await discountModel.addPromotion(newPromo);
        res.redirect('/discounts');
    } catch (error) {
        console.error("Error adding promotion:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        await discountModel.deletePromotion(id);
        res.redirect('/discounts');
    } catch (error) {
        console.error("Error deleting promotion:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    renderPromotions,
    addPromotion,
    deletePromotion
};