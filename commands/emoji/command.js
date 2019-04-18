var HashMap = require('hashmap');
const emoji = new HashMap();

function showHelp(message) {
    var response = "I know about the following emoji!\n";
    emoji.forEach(function (value, key) {
        response += "   " + key + "\n";
    });

    message.channel.send(response);
}

var name = 'emoji';
module.exports = {
    name: name,
    initialize: function(config, discordClient) {

    },
    canHandle: function(command) {
        return emoji.has(command) || name === command;
    },
    handle: function (args, message) {
        if (args.length == 2 && args[1] === 'help') {
            showHelp(message);
            return;
        }

        var token = args[0];
        var images = emoji.get(token);
        if (images) {
            var url = images[Math.floor(Math.random() * images.length)];
            message.channel.sendFile(url, "")
            message.delete().catch(console.error);
        } else {
            message.channel.send("ZOINK! Thats not a command. Need help? Try \"help\" !");
        }
    }
}

emoji.set("hungry",
    [
        "https://i.imgur.com/9h9MJV0.png",
        "https://i.imgur.com/ArIZMPM.png",
        "https://i.imgur.com/B2z2nZ2.png",
        "https://i.imgur.com/24tFlBK.png",
        "https://i.imgur.com/TbIAa4N.png"
    ]);
emoji.set("sleepy",
    [
        "https://i.imgur.com/KIyh9vQ.png",
        "https://i.imgur.com/1VoTq5s.png",
        "https://i.imgur.com/zTtaU4L.png",
    ]);
emoji.set("sad",
    [
        "https://i.imgur.com/rmsECMl.png",
        "https://i.imgur.com/yBS4U0n.png"
    ]);
emoji.set("tp",
    [
        "https://i.imgur.com/9wTwEQK.png"
    ]);
emoji.set("hi5",
    [
        "https://i.imgur.com/zmrVQ0z.png"
    ]);
emoji.set("whatislove",
    [
        "https://i.imgur.com/UFnSNlH.gif"
    ]);
emoji.set("facepalm",
    [
        "https://cdn.discordapp.com/emojis/230334449135517697.png"
    ]);
emoji.set("wink",
    [
        "https://i.imgur.com/0cz4yt6.png"
    ]);
emoji.set("love",
    [
        "https://i.imgur.com/CJhywIp.png",
        "https://i.imgur.com/DSHMUV2.png",
        "https://i.imgur.com/HHP86XR.png",
        "https://i.imgur.com/KJXn7iG.png",
        "https://i.imgur.com/M5c0WIm.png",
        "https://i.imgur.com/MaG4hFn.png",
        "https://i.imgur.com/NRDEA4l.png",
        "https://i.imgur.com/Oi1n2Fh.png"
    ]);
emoji.set("stuffed",
    [
        "https://i.imgur.com/DbdaI5n.png"
    ]);
emoji.set("foilhat",
    [    
        "https://cdn.discordapp.com/attachments/468033427598344203/568415003238203392/tinfoil.jpg"
    ]);


//"https://i.imgur.com/0FU83u4.png", 
//"https://i.imgur.com/0FoOrIl.png", 
//"https://i.imgur.com/0KB4XfU.png", 
//"https://i.imgur.com/0XoSPSo.png", 
//"https://i.imgur.com/0bHXD81.png", 
//"https://i.imgur.com/1J3eMyc.png", 
//
//"https://i.imgur.com/1nrwBX3.png", 
//
//"https://i.imgur.com/2DBA42q.png", 
//"https://i.imgur.com/2EYmNa9.png", 
//"https://i.imgur.com/2QdBD6T.png", 
//"https://i.imgur.com/37WJa59.png", 
//"https://i.imgur.com/3J8iOn8.png", 
//"https://i.imgur.com/40yzxzp.png", 
//"https://i.imgur.com/4EBJINs.png", 
//"https://i.imgur.com/4PIfa8X.png", 
//"https://i.imgur.com/4UzM3Lq.png", 
//"https://i.imgur.com/4a6vl1Z.png", 
//"https://i.imgur.com/4xQIqUa.png", 
//"https://i.imgur.com/5NI2u1h.png", 
//"https://i.imgur.com/5VSy0Vx.png", 
//"https://i.imgur.com/5XhV1WV.png", 
//"https://i.imgur.com/5jTgs8m.png", 
//"https://i.imgur.com/5tLWq6z.png", 
//"https://i.imgur.com/6IXds2O.png", 
//"https://i.imgur.com/6ZMcqxl.png", 
//"https://i.imgur.com/6fhowpq.png", 
//"https://i.imgur.com/7Vz6k1v.png", 
//"https://i.imgur.com/8MVUbCF.png", 
//"https://i.imgur.com/8VAZvnZ.png", 
//"https://i.imgur.com/8mzN883.png", 
//"https://i.imgur.com/8o5h9Vv.png", 
//"https://i.imgur.com/9fEFZJH.png", 
//
//
//"https://i.imgur.com/AuwR189.png", 
//"https://i.imgur.com/B2z2nZ2.png", 
//
// Sleepy
//"https://i.imgur.com/B4kliVk.png", 
//
//
//"https://i.imgur.com/BLko6Hg.png", 
//"https://i.imgur.com/Bbo6TLb.png", 
//"https://i.imgur.com/BdUFUY0.png", 
//
// Overslept
//"https://i.imgur.com/C8Fzfjn.png", 
//
// Dressup
//"https://i.imgur.com/CaDrEQ1.png",
//
// 
//"https://i.imgur.com/Cg9rdft.png", 
//"https://i.imgur.com/DHBKpcD.png", 
//
// cleaning
//"https://i.imgur.com/DHo32h7.png", 
//
// 
//"https://i.imgur.com/ETpnUWY.png",
//
// taxi
//"https://i.imgur.com/FR9YTlM.png", 
//
// Line / queue
//"https://i.imgur.com/FSkd0Ix.png", 
//
//
//"https://i.imgur.com/Fa5ZJ78.png",
//
// feast 
//"https://i.imgur.com/Ga9ZBI0.png", 
//
//
//"https://i.imgur.com/GtlisbT.png", 
//
// dead
//"https://i.imgur.com/Gtsh8tp.png", 
//
//
//"https://i.imgur.com/HSYcnpy.png", 
//"https://i.imgur.com/ImtLOlW.png", 
//"https://i.imgur.com/JOmhuMM.png", 
//"https://i.imgur.com/JwQc4ls.png", 
//"https://i.imgur.com/Jzu6tZV.png", 
//"https://i.imgur.com/K6sIF7k.png", 
// love dodge
//"https://i.imgur.com/KU5QDYn.png", 
//
//
//"https://i.imgur.com/KjxmmDX.png",
//
//dance 
//"https://i.imgur.com/KxmZ5ws.png", 
//
//feast
//"https://i.imgur.com/LBceWJB.png", 
//
//
//"https://i.imgur.com/LQOPdIx.png", 
//"https://i.imgur.com/LfcOkav.png",
//
// I dont know what the fuck is going on here 
//"https://i.imgur.com/LnRND9y.png", 
//
//
//"https://i.imgur.com/LtkJhgg.png", 
//"https://i.imgur.com/MZuoBDa.png", 
//"https://i.imgur.com/McGl6fJ.png", 
//"https://i.imgur.com/NCEjgWf.png", 
//"https://i.imgur.com/NFvyMFI.png", 
//"https://i.imgur.com/NPWcoaR.png", 
//"https://i.imgur.com/NkzGS1v.png", 
//
//tantrum
//"https://i.imgur.com/O5f81PU.png", 
//
//
//"https://i.imgur.com/OBVc2Oh.png", 
//
//backrub
//"https://i.imgur.com/OCR1LY7.png", 
//
//
//"https://i.imgur.com/OKdOpFb.png", 
//
//redcard
//"https://i.imgur.com/OREPxgb.png", 
//
//
//"https://i.imgur.com/ORheVnr.png", 
//"https://i.imgur.com/P6KFa3t.png", 
//"https://i.imgur.com/PGqTnQh.png", 
//"https://i.imgur.com/PU9xQ9r.png", 
//"https://i.imgur.com/PYBieIU.png", 
//"https://i.imgur.com/QE31OMd.png", 
//"https://i.imgur.com/QEYldrV.png", 
//"https://i.imgur.com/QVQnvtW.png", 
//"https://i.imgur.com/QdesYTq.png", 
//"https://i.imgur.com/QpkHubJ.png", 
//"https://i.imgur.com/QxECvqs.png", 
//"https://i.imgur.com/RidJ8Kg.png", 
//"https://i.imgur.com/SKhMHag.png", 
//"https://i.imgur.com/SXxa2qa.png", 
//"https://i.imgur.com/SnybWs9.png", 
//"https://i.imgur.com/T1UfkpJ.png", 
//"https://i.imgur.com/T3BLYBg.png", 
//
//"https://i.imgur.com/TdRbIQC.png", 
//"https://i.imgur.com/VGUuaWc.png", 
//"https://i.imgur.com/VRGdpiL.png", 
//"https://i.imgur.com/VcsaSQ6.png", 
//"https://i.imgur.com/VefCOd2.png", 
//"https://i.imgur.com/W7i6U8Y.png", 
//"https://i.imgur.com/WDWC0TT.png", 
//"https://i.imgur.com/WGrPzl0.png", 
//"https://i.imgur.com/WaZ905V.png", 
//"https://i.imgur.com/X6PgLmY.png", 
//"https://i.imgur.com/XIJu9ZF.png", 
//"https://i.imgur.com/XL4kWDN.png", 
//"https://i.imgur.com/XLSa1bn.png", 
//"https://i.imgur.com/XYgdZNQ.png", 
//"https://i.imgur.com/XxdFnbn.png", 
//"https://i.imgur.com/Y2FAg4f.png", 
//"https://i.imgur.com/YMejMcl.png", 
//"https://i.imgur.com/YSyaAeS.png", 
//"https://i.imgur.com/YWAgGrL.png", 
//"https://i.imgur.com/YWk4f0x.png", 
//"https://i.imgur.com/Z9lrMNu.png", 
//"https://i.imgur.com/ZJXSgMQ.png", 
//"https://i.imgur.com/ZNK5Py2.png", 
//"https://i.imgur.com/ZWUFzDJ.png", 
//"https://i.imgur.com/Zb9AmBT.png", 
//"https://i.imgur.com/ZduFJhA.png", 
//"https://i.imgur.com/aNFXvk0.png", 
//"https://i.imgur.com/aU5EAGU.png", 
//"https://i.imgur.com/arhslOw.png", 
//"https://i.imgur.com/bAxPaoy.png", 
//"https://i.imgur.com/bLsGotj.png", 
//"https://i.imgur.com/bM3ixtG.png", 
//"https://i.imgur.com/bXUnRxs.png", 
//"https://i.imgur.com/bpOCwdj.png", 
//"https://i.imgur.com/bs4sZFh.png", 
//"https://i.imgur.com/c7tZ6QN.png", 
//"https://i.imgur.com/ccvsBRb.png", 
//"https://i.imgur.com/cj00iJ2.png", 
//"https://i.imgur.com/cxtbPlo.png", 
//"https://i.imgur.com/d8hPTJv.png", 
//"https://i.imgur.com/dFCHtCT.png", 
//"https://i.imgur.com/dJ4Vdld.png", 
//"https://i.imgur.com/dJ7WXyL.png", 
//"https://i.imgur.com/dUVIuCf.png", 
//"https://i.imgur.com/dfbDSag.png", 
//"https://i.imgur.com/djtnbhl.png", 
//"https://i.imgur.com/dlUUCsC.png", 
//"https://i.imgur.com/dljYd5Z.png", 
//"https://i.imgur.com/dol5kxf.png", 
//"https://i.imgur.com/e7bSW28.png", 
//"https://i.imgur.com/eIIuquM.png", 
//"https://i.imgur.com/eUSG2vY.png", 
//"https://i.imgur.com/etJNsSp.png", 
//"https://i.imgur.com/exuqjKT.png", 
//"https://i.imgur.com/f4WGhd7.png", 
//"https://i.imgur.com/fnYUMR7.png", 
//"https://i.imgur.com/g3YENRm.png", 
//"https://i.imgur.com/gMZ2ji6.png", 
//"https://i.imgur.com/hVXQQ9z.png", 
//"https://i.imgur.com/hcXGnCe.png", 
//"https://i.imgur.com/hg4tSJP.png", 
//"https://i.imgur.com/huSbu3m.png", 
//"https://i.imgur.com/i0e8dkk.png", 
//"https://i.imgur.com/i2ii8mz.png", 
//"https://i.imgur.com/iC7Ul8c.png", 
//"https://i.imgur.com/iQTOr64.png", 
//"https://i.imgur.com/iSy3lPL.png", 
//"https://i.imgur.com/iWZjVjj.png", 
//"https://i.imgur.com/iWrXMwy.png", 
//"https://i.imgur.com/jy9ZpOi.png", 
//"https://i.imgur.com/k8DsogV.png", 
//"https://i.imgur.com/kCr7tCw.png", 
//"https://i.imgur.com/kVHq56g.png", 
//"https://i.imgur.com/kfjMDUN.png", 
//"https://i.imgur.com/l9HdWTs.png", 
//"https://i.imgur.com/lNMegyD.png", 
//"https://i.imgur.com/lS1pfsb.png", 
//"https://i.imgur.com/lc5xZzm.png", 
//"https://i.imgur.com/lmZG1ka.png", 
//"https://i.imgur.com/mEGJE5l.png", 
//"https://i.imgur.com/mRe2yQf.png", 
//"https://i.imgur.com/mYHfG7T.png", 
//"https://i.imgur.com/mZ3iZJy.png", 
//"https://i.imgur.com/nPBXV5Q.png", 
//"https://i.imgur.com/nTHoxj6.png", 
//"https://i.imgur.com/nWPKatU.png", 
//"https://i.imgur.com/ng8we0A.png", 
//"https://i.imgur.com/oAV7e1b.png", 
//"https://i.imgur.com/oT0UORo.png", 
//"https://i.imgur.com/oiYdN50.png", 
//"https://i.imgur.com/pgHuy4L.png", 
//"https://i.imgur.com/plrkGG8.png", 
//"https://i.imgur.com/qPRzOy4.png", 
//"https://i.imgur.com/qRAHHn8.png", 
//"https://i.imgur.com/qdXNqzU.png", 
//"https://i.imgur.com/qjlxWYI.png", 
//
//"https://i.imgur.com/s7kzcPC.png", 
//"https://i.imgur.com/s7tTz29.png", 
//"https://i.imgur.com/sAEcxMf.png", 
//"https://i.imgur.com/sV90vmK.png", 
//"https://i.imgur.com/siOtJpc.png", 
//"https://i.imgur.com/tQjR3ma.png", 
//"https://i.imgur.com/tUu6VBE.png", 
//"https://i.imgur.com/tUukWv9.png", 
//"https://i.imgur.com/tfptmBv.png", 
//"https://i.imgur.com/tscXrFu.png", 
//"https://i.imgur.com/ttqdQZf.png", 
//"https://i.imgur.com/u6B7oI7.png", 
//"https://i.imgur.com/u6sXJnS.png", 
//"https://i.imgur.com/uAIjIUK.png", 
//"https://i.imgur.com/uN6T7lL.png", 
//"https://i.imgur.com/v7jChsm.png", 
//"https://i.imgur.com/vszmd6c.png", 
//"https://i.imgur.com/vzP1jqV.png", 
//"https://i.imgur.com/w4P124B.png", 
//"https://i.imgur.com/wLHPxax.png", 
//"https://i.imgur.com/wXMbatv.png", 
//"https://i.imgur.com/whkufI9.png", 
//"https://i.imgur.com/x2Po37G.png", 
//"https://i.imgur.com/xHnubaJ.png", 
//"https://i.imgur.com/xUZVRXb.png", 
//"https://i.imgur.com/xViec8N.png", 
//"https://i.imgur.com/y3lR8BD.png",  
//"https://i.imgur.com/ynqznKC.png", 
//"https://i.imgur.com/zTXd4BM.png", 
//
//"https://i.imgur.com/zXv9i30.png",  
//"https://i.imgur.com/znodsGH.png", 
