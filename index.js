"use strict";

const me = this;

const logger = require('./logger');
const request = require('request');
const config = require('config');
const moment = require('moment');

// https://developers.trello.com/
// https://developers.trello.com/reference/


module.exports.printCards = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const boardId = config.trello_api.boardId;

    const options =
        {
            uri: 'https://api.trello.com/1/boards/' + boardId + '/cards',
            qs: {
                "key": key,
                "token": token
                // "fields": "idShort,name,url,due"
            }
        };

    request.get(options,
        function (err, response, body) {
            if (err) {
                logger.main.error(err);
                return;
            }
            const boardsList = JSON.parse(body);
            logger.main.info(boardsList);
            for (let index = 0; index < boardsList.length; index++) {

                if (boardsList[index].due) {
                    const time_moment = moment(boardsList[index].due);
                    const day = time_moment.format("YYYY/MM/DD");
                    const time = time_moment.format("HH:mm:ss");
                    console.log(boardsList[index].idShort + "\t" + boardsList[index].name + "\t" + day + "\t" + time);
                } else {
                    console.log(boardsList[index].idShort + "\t" + boardsList[index].name + "\t");
                }


            }
        }
    );
};


module.exports.getCards = (boardId) => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://api.trello.com/1/boards/' + boardId + '/cards',
            qs: {
                "key": key,
                "token": token
                // "fields": "idShort,name,url,due"
            }
        };


    const promise = new Promise((resolve, reject) => {
        request.get(options,
            function (err, response, body) {
                if (err) {
                    reject(err);
                    return;
                }
                const cardsArray
                    = JSON.parse(body);
                resolve(cardsArray);
            }
        );
    });

    return promise;
};


module.exports.printBoards = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://api.trello.com/1/members/masatomix/boards',
            qs: {
                "key": key,
                "token": token,
                "fields": "name,url"
            }
        };

    request.get(options,
        function (err, response, body) {
            if (err) {
                logger.main.error(err);
                return;
            }
            const boardsList = JSON.parse(body);
            logger.main.info(boardsList);

            for (let index = 0; index < boardsList.length; index++) {
                console.log(boardsList[index]);
            }
        }
    );
};


module.exports.printMyInfo = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://api.trello.com/1/members/me/',
            qs: {
                "key": key,
                "token": token
            }
        };


    request.get(options,
        function (err, response, body) {
            if (err) {
                logger.main.error(err);
                return;
            }
            const obj = JSON.parse(body);
            const idBoards = obj.idBoards;
            logger.main.info(idBoards);
            for (let index = 0; index < idBoards.length; index++) {
                console.log(idBoards[index]);

            }
            console.log(obj.username);
        }
    );
};


module.exports.getMyUser = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const options =
        {
            uri: 'https://api.trello.com/1/members/me/',
            qs: {
                "key": key,
                "token": token
            }
        };

    const promise = new Promise((resolve, reject) => {
        request.get(options,
            function (err, response, body) {
                if (err) {
                    reject(err);
                    return;
                }
                const obj = JSON.parse(body);
                resolve(obj);
            }
        );

    });
    return promise;

};


// me.printBoards();
// me.printMyInfo();
// me.printCards();
// me.execute();

me.getMyUser().then((obj) => {
    console.log(obj.username);
    console.log(obj.fullName);
});


me.getCards(config.trello_api.boardId).then((cardArray) => {
    console.log(cardArray);
});