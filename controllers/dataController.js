const dataJson = require('../models/dataSchema');

exports.datapost = async (req, res) => {
    try {
      const dataArray = req.body;
  
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return res.status(400).json({ error: "Invalid data format." });
      }
  
      const ids = dataArray.map((data) => data.id);
      const existingIds = await dataJson.find({ id: { $in: ids } });
  
      if (existingIds.length > 0) {
        return res.status(400).json({ error: `Some IDs already exist in the database.${existingIds}` });
      }
  
      const insertedData = await dataJson.insertMany(dataArray);
      res.status(200).json(insertedData);
    } catch (error) {
      console.error("Error inserting documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  



//   get movies 


exports.getData = async (req, res) => {
    try {
        const maxLimit = 20;
        const { page = 1, limit = 20 } = req.query;
        const limitedLimit = Math.min(parseInt(limit), maxLimit);
        const skip = (page - 1) * limitedLimit;
        const movies = await dataJson.find().skip(skip).limit(limitedLimit).exec();

        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// advance filter 


exports.advancedatafilter = async (req, res) => {
    const keyword = req.query.keyword || "";
    const genre = req.query.genre || "";
    const country = req.query.country || "";
    const premiered = req.query.premiered || "";
    const year = req.query.year || "";
    const type = req.query.type || "";
    const status = req.query.status || "";
    const rating = req.query.rating || "";
    const language = req.query.language || "";

    const query = {
        title: { $regex: keyword, $options: "i" },
        genre: { $regex: genre, $options: "i" },
        country: { $regex: country, $options: "i" },
        premiered: { $regex: premiered, $options: "i" },
        premiered: { $regex: year, $options: "i" },
        type: { $regex: type, $options: "i" },
        status: { $regex: status, $options: "i" },
        rating: { $regex: rating, $options: "i" },
        language: { $regex: language, $options: "i" },
    };

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 20);
    const skip = (page - 1) * limit;

    try {
        const advancefilter = await dataJson.find(query).skip(skip).limit(limit);
        res.status(200).json(advancefilter);
    } catch (error) {
        res.status(400).json(error);
        console.log("Error");
    }
};


// get data by id 


exports.getonedata = async(req, res)=> {

    const {id} = req.params;

    try {

        const getOneData = await dataJson.findOne({id:id})

        res.status(200).json(getOneData)
        
    } catch (error) {
        res.status(400).json(error);
        console.log("Error");
    }

}


// delete user 


exports.deletedata = async(req, res)=> {

    const {id} = req.params;

    try {

        const deletedatabyid = await dataJson.findByIdAndDelete({_id:id})

        res.status(200).json(deletedatabyid)
        
    } catch (error) {
        res.status(400).json(error);
        console.log("Error");
    }

}



// // update data 

exports.updatedata = async(req, res)=> {

    const {dataid} = req.params;
    
    const {id, title, embed_title, sposter, bposter, type, duration, country, episodes, subtitle, dubbed,  description, date, genre, status, premiered, language, studios, rating, producers} = req.body;

    try {

        const updatedatabyid = await dataJson.findByIdAndUpdate({_id:dataid},{
            id, title, embed_title, sposter, bposter, type, duration, country, episodes, subtitle, dubbed, description, date, genre, status, premiered, language, studios, rating, producers
        }, {new:true})

        await updatedatabyid.save()

        res.status(200).json(updatedatabyid)
        
    } catch (error) {
        res.status(400).json(error);
        console.log("Error");
    }

}