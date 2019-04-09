let mongoDb = require("mongodb");
let mongoClient = mongoDb.MongoClient;
let dbURL = "mongodb://localhost:27017/";
class Util {
    resMessage(res) {
        return res;
    }
    connectDb() {
        return mongoClient.connect(dbURL);
    }
    getCollection(collectionName) {
        return (this.connectDb()
        .then((db) => {
            return db.db("API").collection(collectionName)
        })
        .catch((err) => {
            return err;
        }));
    }
    getDataFromCollection(collectionName) {
        return (this.getCollection(collectionName)
            .then((data) => {
                return data.find({}).toArray()
                .then((dataArray) => {
                    return dataArray;
                })
                .catch((err) => {
                    return err;
                });
            })
            .catch((err) => {
                return err;
            })
        );
    }
    getFirstDataFromCollection(collectionName,id) {
        return (this.getCollection(collectionName)
            .then((data) => {
                return data.findOne({name:id})
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    return err;
                });
            })
            .catch((err) => {
                return err;
            })
        );
    }
    addDataIntoCollection(collectionName,respData) {
        return this.findData(collectionName,respData.name)
        .then((data) => {
            if(data.length == 0) {
                return this.getCollection(collectionName)
                .then((data) => {
                    return data.insertOne(respData)
                    .then((resp) => {
                        return resp;
                    })
                    .catch((err) => {
                        return err;
                    });    
                })
                .catch((err) => {
                    return err;
                });
            }
            else {
                return {
                    status : "failure",
                    message : "A policy with this name already exists"
                }
            }
        })
        .catch((err) => {
            return err;
        });
    }
    deleteDataFromCollection(collectionName,id) {
        return this.getCollection(collectionName)
        .then((data) => {
            return data.deleteOne({name:id})
            .then((resp) => {
                return resp;
            })
            .catch((err) => {
                return err;
            });    
        })
        .catch((err) => {
            return err;
        });
    }
    /*updateData(collectionName,query,updatedDesc) {
        return this.getCollection(collectionName)
        .then((data) => {
            return data.updateOne(query,updatedDesc)
            .then((resp) => {
                return resp;
            })
            .catch((err) => {
                return err;
            });    
        })
        .catch((err) => {
            return err;
        });
    }
    */
    updateSingleData(collectionName,query) {
        return this.getCollection(collectionName,query.name)
        .then((data) => {
            let toFind = {name:query.name,'desc.id' : parseInt(query.id)};
            let updatedDesc = {$set : {'desc.$.text' : query.desc}};
            return data.updateOne(toFind,updatedDesc)
            .then((resp) => {
                return resp;
            })
            .catch((err) => {
                return err;
            });    
        })
        .catch((err) => {
            return err;
        });
    }
    findData(collectionName,name) {
        return this.getCollection(collectionName,name)
        .then((data) => {
            return data.find({name:name}).toArray()
            .then((resp) => {
                return resp;
            })
            .catch((err) => {
                return err;
            });    
        })
        .catch((err) => {
            return err;
        });
    }
}

module.exports = Util;