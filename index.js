"use strict";

const me = this;

const logger = require('./logger');
const request = require('request');
const config = require('config');
const moment = require('moment');


// https://developers.trello.com/
// https://developers.trello.com/reference/


// List 一覧をPrint
module.exports.getList = (boardId) => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const options =
        {
            uri: 'https://api.trello.com/1/boards/' + boardId + '/lists',
            qs: {
                "key": key,
                "token": token,
                "card": "all"
                // , "fields": "id,name,idBoard"
            }
        };


    const promise = new Promise((resolve, reject) => {
        request.get(options,
            function (err, response, body) {
                if (err) {
                    reject(err);
                    return;
                }
                const listArray
                    = JSON.parse(body);
                resolve(listArray);
            }
        );
    });
    return promise;
};


// List 一覧をPrint
module.exports.printList = (boardId) => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const options =
        {
            uri: 'https://api.trello.com/1/boards/' + boardId + '/lists',
            qs: {
                "key": key,
                "token": token,
                "card": "all"
                // , "fields": "id,name,idBoard"
            }
        };

    request.get(options,
        function (err, response, body) {
            if (err) {
                logger.main.error(err);
                return;
            }
            console.log(body);
            const list = JSON.parse(body);
            logger.main.info(list);
            // for (let index = 0; index < list.length; index++) {
            //     console.log(list[index].id);
            //     console.log(list[index].name);
            //     console.log(list[index].idBoard);
            // }
        }
    );
};


// Card 一覧をPrint
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
            const cards = JSON.parse(body);
            logger.main.info(cards);
            for (let index = 0; index < cards.length; index++) {
                let card = card[index];

                if (card.due) {
                    const time_moment = moment(card.due);
                    const day = time_moment.format("YYYY/MM/DD");
                    const time = time_moment.format("HH:mm:ss");
                    console.log(card.idShort + "\t" + card.name + "\t" + me.printMembers(card) + "\t" + day + "\t" + time);
                } else {
                    console.log(card.idShort + "\t" + card.name + "\t" + me.printMembers(card) + "\t");
                }


            }
        }
    );
};


// Card 一覧を取得
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


module.exports.getCards = (boardId, listId) => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;

    const options =
        {
            uri: 'https://api.trello.com/1/lists/' + listId + '/cards',
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


const fs = require('fs');
const iconv = require('iconv-lite');

module.exports.writeFile = (path, data) => {
    const encode = iconv.encode(data, 'shift_jis');

    fs.appendFile(path, encode, function (err) {
        if (err) {
            throw err;
        }
    });
};

module.exports.deleteFile = (path) => {
    fs.access(path, function (err) {
            if (err) {
                // if (err.code === 'ENOENT') {
                //     console.log('not exists!!');
                // }
            } else {
                fs.unlinkSync(path);
            }
        }
    );
};


// me.printBoards();
// me.printMyInfo();
// me.printCards();
// me.execute();

// me.getMyUser().then((obj) => {
//     console.log(obj.username);
//     console.log(obj.fullName);
// });
//
//
// me.getCards(config.trello_api.boardId).then((cardArray) => {
//     console.log(cardArray);
// });


// me.printList(config.trello_api.boardId);


module.exports.getBoardMembers = (boardId) => {

    const key = config.trello_api.key;
    const token = config.trello_api.token;
    const options =
        {
            uri: 'https://api.trello.com/1/boards/' + boardId + '/members',
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


module.exports.getMemberStr = (memberId, members) => {
    const membersHash = {};
    for (let index = 0; index < members.length; index++) {
        membersHash[members[index].id] = members[index];
    }
    return membersHash[memberId].fullName;
};


module.exports.getMembersStr = (card, members) => {
    let returnStr = "";
    const cardMembers = card.idMembers;
    for (let index = 0; index < cardMembers.length; index++) {
        returnStr += me.getMemberStr(cardMembers[index], members) + ", ";
    }
    return returnStr;
};


me.getBoardMembers(config.trello_api.boardId).then((members) => {
    me.deleteFile("result.tsv");
    me.getList(config.trello_api.boardId)
        .then((listArray) => {

            for (let index = 0; index < listArray.length; index++) {
                const list = listArray[index];

                const excludeListIds = config.trello_api.excludeListIds;

                if (!excludeListIds.includes(list.id)) {
                    me.getCards(config.trello_api.boardId, list.id)
                        .then((cardArray) => {
                            let data = '';
                            for (let indexJ = 0; indexJ < cardArray.length; indexJ++) {
                                let message = list.name + "\t" + cardArray[indexJ].idShort + "\t" + cardArray[indexJ].name + "\t";
                                if (cardArray[indexJ].due) {
                                    const time_moment = moment(cardArray[indexJ].due);
                                    const day = time_moment.format("YYYY/MM/DD");
                                    const time = time_moment.format("HH:mm:ss");
                                    message += day + "\t" + time + "\t";
                                } else {
                                    message += "\t" + "\t";
                                }
                                message += me.getMembersStr(cardArray[indexJ], members);
                                data += message + "\n";
                                console.log(message);
                            }
                            me.writeFile("result.tsv", data);

                        });
                }
            }

        });


});