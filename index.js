"use strict";

const me = this;

const logger = require('./logger');
const request = require('request');
const config = require('config');
const moment = require('moment');


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

me.execute();
me.execute2();