var fs = require('fs');
var path = require('path');
var dotenv = require('dotenv');
var file = require('../../modules/checkEmptyFile');

dotenv.config();
var pathFile = path.dirname(__filename) + '/../' + 
           process.env.JSON_DATA_DIRNAME + 
           process.env.FILMS_JSON_FILENAME;

function deleteFilmTitle(title){
    try{
        //Check if JSON file is empty
        file.checkEmptyFile();

        //Convert to JSON object JSON file
        var fileData = fs.readFileSync(pathFile, 'utf8');
        var dataOBJ = JSON.parse(fileData);

        //Check if exists a film with the same title argument
        var numberFilms = dataOBJ['films'].length;
        for(var i = 0; i < numberFilms; i++){
            if(dataOBJ['films'][i].title == title){
                delete dataOBJ['films'][i];
                i--;
                numberFilms--;
            }
        }

        //If there has been changes
        if(numberFilms != dataOBJ['films'].length){
            //Write on films.json
            var newDATA = JSON.stringify(dataOBJ, null, 2);
            fs.writeFileSync(pathFile, newDATA);

            return 'Some films were deleted';
        }else{
            return 'No films were deleted';
        }
    }catch(error){
        return error;
    }
}

exports.deleteFilmTitle = deleteFilmTitle;