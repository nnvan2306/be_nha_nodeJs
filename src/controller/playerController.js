import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import {
    createPlayerService,
    deletePlayerService,
    getAllPlayerService,
    getLimitPlayerService,
    searchPlayerService,
    updatePlayerService,
} from "../service/playerService";

export const handleCreatePlayer = async (req, res) => {
    const player = JSON.parse(JSON.stringify(req.body));
    try {
        //validate
        if (
            !player?.code ||
            !player?.name ||
            !player?.nationality ||
            !player?.height ||
            !player?.weight ||
            !player?.birthday ||
            !player?.teamId ||
            !player?.description ||
            !player?.des_text ||
            !req.file
        ) {
            return res.status(400).json(returnInfoEmpty());
        }

        console.log(req.body);

        let dataBuider = {
            code: player?.code,
            name: player?.name,
            nationality: player?.nationality,
            height: player?.height,
            weight: player?.weight,
            birthday: player?.birthday,
            teamId: player?.teamId,
            isActive: player?.isActive,
            description: player?.description,
            des_text: player?.des_text,
            avatar_url: req.file.filename,
        };

        // console.log(dataBuider);
        let fetch = await createPlayerService(dataBuider);
        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 400 : 500
            )
            .json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const handleGetPlayers = async (req, res) => {
    let player = req.query;
    try {
        let players;
        if (player.page && player.pageSize) {
            let page = player.page;
            let pageSize = player.pageSize;

            players = await getLimitPlayerService(+page, +pageSize);
        } else {
            players = await getAllPlayerService();
        }

        return res.status(players.errorCode === 0 ? 200 : 500).json({
            message: players.message,
            errorCode: players.errorCode,
            data: players.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const deletePlayer = async (req, res) => {
    try {
        let player = req.query.code;
        if (player) {
            let fetch = await deletePlayerService(player);
            return res.status(200).json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const handleUpdatePlayer = async (req, res) => {
    let player = JSON.parse(JSON.stringify(req.body));
    try {
        if (
            !player.id ||
            !player.code ||
            !player.name ||
            !player.description ||
            !player.des_text ||
            !player.nationality ||
            !player.height ||
            !player.weight ||
            !player.birthday ||
            !player.teamId ||
            !player.avatar_url
        ) {
            return res.status(400).json(returnInfoEmpty());
        }

        let dataBuider = {
            ...player,
            isChangeFile: JSON.parse(player.isChangeFile),
        };
        if (player.isChangeFile) {
            dataBuider.avatar = req?.file?.filename;
        }

        let fetch = await updatePlayerService(dataBuider);
        return res.status(fetch.errorCode === 0 ? 200 : 500).json({
            message: fetch.message,
            errorCode: fetch.errorCode,
            data: fetch.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const handleSearchPlayer = async (req, res) => {
    try {
        let search = req.query;

        if (search.q) {
            let textSearch = search.q;

            let fetch = await searchPlayerService(textSearch);

            return res.status(fetch.errorCode === 0 ? 200 : 500).json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};
