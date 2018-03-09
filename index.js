"use strict";

const me = this;

const logger = require('./logger');
const request = require('request');
const config = require('config');
const moment = require('moment');

// https://developers.trello.com/
// https://developers.trello.com/reference/


module.exports.execute3 = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const boardId = config.trello_api.boardId;

    const options =
        {
            uri: 'https://trello.com/1/boards/' + boardId + '/cards',
            qs: {
                "key": key,
                "token": token,
                "fields": "idShort,name,url,due"
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


module.exports.execute = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://trello.com/1/members/masatomix/boards',
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


module.exports.execute2 = () => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://trello.com/1/members/me/',
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
            // console.log(robots);
            for (let index = 0; index < idBoards.length; index++) {
                console.log(idBoards[index]);

            }
        }
    );
};

me.execute3();
// me.execute();