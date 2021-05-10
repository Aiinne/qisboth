/*[-- require hdlr --]*/
const {
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime,
    Browser
} = require('@adiwajshing/baileys');
const moment = require("moment-timezone") 
const fs = require("fs") 
const util = require('util')
const fetch = require('node-fetch')
const os = require('os')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { donasi } = require('./lib/donasi')
const { bahasa } = require('./lib/bahasa')
const { negara } = require('./lib/kodenegara')
const { randompict } = require('./lib/randompict')
const { developer } = require('./lib/developer')
const { menugrup } = require('./lib/menugrup')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec, spawn } = require("child_process")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const ms = require('parse-ms')
const toMs = require('ms')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const cd = 4.32e+7
const { ind } = require('./language')
const a = '```'

/*[-- Load setting --]*/
const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	cr,
	BotPrefix,
	owner,
	author,
	pack
} = settingan

/*[-- manual load --]*/
const ownerNumber = `${owner}@s.whatsapp.net`
prefix = BotPrefix
limitawal = 1000000
memberlimit = 0
blocked = []   

/*[-- load function --]*/
/*[-> level <-]*/
const {
	getLevelingXp,
	getLevelingLevel,
	getLevelingId,
	addLevelingXp,
	addLevelingLevel,
	addLevelingId
} = require('./lib/level.js')

/*[-> register <-]*/
const {
	getRegisteredRandomId,
	addRegisteredUser,
	createSerial,
	checkRegisteredUser
} = require('./lib/register.js')

/*[-> ATM & Limit <-]*/
const {
	addATM,
	addKoinUser,
	checkATMuser,
	bayarLimit,
	confirmATM,
	limitAdd
} = require('./lib/limitatm.js')

/*[-> afk <-]*/
const {
	addAfkUser,
    checkAfkUser,
    getAfkReason,
    getAfkTime,
    getAfkId,
    getAfkPosition,
    afkDel
} = require('./lib/afk.js')

/*[-> total cmd <-]*/
const {
	cmdadd
} = require('./lib/totalcmd.js')
	
/*[-- VCARD --]*/
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Admin akuuuu\n' 
            + `ORG: Pengembang bot;\n`
            + `TEL;type=CELL;type=VOICE;waid=${owner}:${PhoneNumber('+' + owner).getNumber('international')}\n` 
            + 'END:VCARD' 

       
/*[-- load file --]*/
const setiker = JSON.parse(fs.readFileSync('./strg/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./strg/video.json'))
const audionye = JSON.parse(fs.readFileSync('./strg/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./strg/image.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
const event = JSON.parse(fs.readFileSync('./database/bot/event.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const antivirtex = JSON.parse(fs.readFileSync('./database/group/antivirtex.json'))
const antiig = JSON.parse(fs.readFileSync('./database/group/antiig.json'))
const antiigg = JSON.parse(fs.readFileSync('./database/group/antiigg.json'))
const antiyt = JSON.parse(fs.readFileSync('./database/group/antiyt.json'))
const antiytt = JSON.parse(fs.readFileSync('./database/group/antiytt.json'))
const bad = JSON.parse(fs.readFileSync('./database/group/bad.json'))
const ban = JSON.parse(fs.readFileSync('./database/user/banned.json'))
const wakil = JSON.parse(fs.readFileSync('./database/user/adm.json'))
const prem = JSON.parse(fs.readFileSync('./database/user/premium.json'))
const badword = JSON.parse(fs.readFileSync('./database/group/badword.json'))

/*[-- function --]*/
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

function addMetadata(packname, author) {	
	if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 
	
	

	/*[-- Update Message --]*/
module.exports = msgHdlr = async (client , mek) => {
	/*[-- Update block --]*/
	client.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	client.on('CB:action,,call', async json => {
	const callerId = json[2][0][1].from;
	await client.sendMessage(callerId, 'Maaf bof tidak bisa menerima panggilan', text)
	await client.blockUser(callerId, "add")
	})
		try {
             if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const timi = moment.tz('Asia/Jakarta').add(30, 'days').calendar();
			const timu = moment.tz('Asia/Jakarta').add(20, 'days').calendar();
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = client.user.jid
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
			/*[-- Scure command --]*/
			const isEventon = isGroup ? event.includes(from) : false
			const isRegistered = checkRegisteredUser(sender)
			const isBadWord = isGroup ? badword.includes(from) : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPremium= prem.includes(sender)
			const isAdmin = wakil.includes(sender)
			const isAfkOn = checkAfkUser(sender)
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isAntiVirtex = isGroup ? antivirtex.includes(from) : false
			const isAntiIg = isGroup ? antiig.includes(from) : false
			const isAntiIgg = isGroup ? antiigg.includes(from) : false
			const isAntiYt = isGroup ? antiyt.includes(from) : false
			const isAntiYtt = isGroup ? antiytt.includes(from) : false
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
			client.sendMessage(from, teks, image, {quoted:mek})
			}
			const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, { contextInfo: { forwardingScore: 400, isForwarded: true } , quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) },message: { conversation: `${target2}` }}})
			}
			const costumimg = ( pesan , tipe, target , caption) => {
			client.sendMessage(from, pesan , tipe , {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: {"imageMessage":{url: 'https://mmg.whatsapp.net/d/f/Ahj0ACnTjSHHm6-HjqAUBYiCu2-85zMZp_-EhiXlsd6A.enc',mimetype: 'image/jpeg',caption: `${caption}`,fileSha256: '0Pk0qJyQFn9FCtslZrydJHRQDKryjYcdP7I3CmRrHRs=',fileLength: '20696',height: 360,width: 382,mediaKey: 'N43d/3GY7GYQpgBymb9qFY5O9iNDXuBirXsNZk+X61I=',fileEncSha256: 'IdFM58vy8URV+IUmOqAY3OZsvCN6Px8gaJlRCElqhd4=',directPath: '/v/t62.7118-24/35174026_475909656741093_8174708112574209693_n.enc?oh=2a690b130cf8f912a9ca35f366558743&oe=6061F0C6',mediaKeyTimestamp: '1614240917',jpegThumbnail: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMASAMBIgACEQEDEQH/xAAwAAADAAMBAAAAAAAAAAAAAAAABAUBAwYCAQADAQEAAAAAAAAAAAAAAAABAgMABP/aAAwDAQACEAMQAAAAoy6kcWS2eH8miq17B553Thh1BgyTY9iULYfndGBmbSwNEV3eWXpjwZElG09WJckXCj8sWBVc1ZKXj2ZYaoWHnc67K3PbKwtZOqzLrzdQAg5fWFRUeCNTQG2pEKJ0wCD/xAAoEAACAgIBAQkAAwEAAAAAAAABAgADBBEScQUQEyEiMTJBYSNRYmP/2gAIAQEAAT8AaZzfEdwWcGMTE1jNv3M1ozDb+SD2jTO+Yigk6A3KqhseIdfkroTYbXQRrkVuJOplKEuOpjtpxF+IjTO+YnZoBvj4pa/msHtMnHZrgymZ6hCnSJsDl+ys7rTpGmevxMwLFS/1fcA7iNzPsDXaH1NccYH+2lJ1SnSNMlOdcbY6iYGa9g4OJzXW9zI7SBJrpjqxsA9zMkcMetf2V7NKD/McgAkxsis7EcA2fkxkqSkaYbMGRu3hr0x6q6ckufaUMpsexj0ma4Y0qDKhqlektyntXiQO4qWI0PONVZWNsNTmZwewekEwo1fpYaMZdvWf2DYrXoO/ARWLNL6VuXiYcSsuK9eXGYtHhM/nsTPVQgb7iDkydRCNBYYx1Ozj6nmSStRIgJ8UH/nMJiTZs/c7RPwExhu+vrH+p//EAB4RAAIBBAMBAAAAAAAAAAAAAAABAhAREjIhMDFC/9oACAECAQE/AOpJsxEqIj4TfNqXygIWpLc+ZEdBH//EAB4RAAICAgIDAAAAAAAAAAAAAAABAjEQETJBAxJx/9oACAEDAQE/AHWVeHQtYrDaNkno7GOzxP10xzWipDHZHidx+EuQz//Z',scansSidecar: 'choizTOCOFXo21QcOR/IlCehTFztHGnB3xo4F4d/kwmxSJJIbMmvxg==',scanLengths: [Array],midQualityFileSha256: '68OHK4IyhiKDNgNAZ3SoXsngzYENebQkV4b/RwhhYIY=',midQualityFileEncSha256: '2EYOLCXx+aqg9RyP6xJYChQNbEjXZmc0EcSwHzoyXx0='}}}})
			}
	    


			/*[-- function level bar --]*/
			var per = '*[▒▒▒▒▒▒▒▒▒▒] 0%*'
			const peri = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
			const perl = peri-getLevelingXp(sender) 
			const resl = Math.round(100-((perl/getLevelingXp(sender))*100))
			if (resl <= 10) {
				per = `*[█▒▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 20) {
				per = `*[██▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 30) {
				per = `*[███▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 40) {
				per = `*[████▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 50) {
				per = `*[█████▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 60) {
				per = `*[██████▒▒▒▒] ${resl}%*`
			} else if (resl <= 70) {
				per = `*[███████▒▒▒] ${resl}%*`
			} else if (resl <= 80) {
				per = `*[████████▒▒] ${resl}%*`
			} else if (resl <= 90) {
				per = `*[█████████▒] ${resl}%*`
			} else if (resl <= 100) {
				per = `*[██████████] ${resl}%*`
			} 
				
				
			
			
			
        /*[-- function rank --]*/
        const levelRole = getLevelingLevel(sender)
        var role = 'Newbie ㋡'
        if (levelRole <= 5) {
            role = 'Newbie ㋡'
        } else if (levelRole <= 10) {
            role = 'Beginner Grade 1 ⚊¹'
        } else if (levelRole <= 15) {
            role = 'Beginner Grade 2 ⚊²'
        } else if (levelRole <= 20) {
            role = 'Beginner Grade 3 ⚊³'
        } else if (levelRole <= 25) {
            role = 'Beginner Grade 4 ⚊⁴'
        } else if (levelRole <= 30) {
            role = 'Private Grade 1 ⚌¹'
        } else if (levelRole <= 35) {
            role = 'Private Grade 2 ⚌²'
        } else if (levelRole <= 40) {
            role = 'Private Grade 3 ⚌³'
        } else if (levelRole <= 45) {
            role = 'Private Grade 4 ⚌⁴'
        } else if (levelRole <= 50) {
            role = 'Private Grade 5 ⚌⁵'
        } else if (levelRole <= 55) {
            role = 'Corporal Grade 1 ☰¹'
        } else if (levelRole <= 60) {
            role = 'Corporal Grade 2 ☰²'
        } else if (levelRole <= 65) {
            role = 'Corporal Grade 3 ☰³'
        } else if (levelRole <= 70) {
            role = 'Corporal Grade 4 ☰⁴'
        } else if (levelRole <= 75) {
            role = 'Corporal Grade 5 ☰⁵'
        } else if (levelRole <= 80) {
            role = 'Sergeant Grade 1 ≣¹'
        } else if (levelRole <= 85) {
            role = 'Sergeant Grade 2 ≣²'
        } else if (levelRole <= 95) {
            role = 'Sergeant Grade 3 ≣³'
        } else if (levelRole <= 100) {
            role = 'Sergeant Grade 4 ≣⁴'
        } else if (levelRole <= 105) {
            role = 'Sergeant Grade 5 ≣⁵'
        } else if (levelRole <= 110) {
            role = 'Staff Grade 1 ﹀¹'
        } else if (levelRole <= 115) {
            role = 'Staff Grade 2 ﹀²'
        } else if (levelRole <= 120) {
            role = 'Staff Grade 3 ﹀³'
        } else if (levelRole <= 125) {
            role = 'Staff Grade 4 ﹀⁴'
        } else if (levelRole <= 130) {
            role = 'Staff Grade 5 ﹀⁵'
        } else if (levelRole <= 135) {
            role = 'Sergeant Grade 1 ︾¹'
        } else if (levelRole <= 140) {
            role = 'Sergeant Grade 2 ︾²'
        } else if (levelRole <= 145) {
            role = 'Sergeant Grade 3 ︾³'
        } else if (levelRole <= 150) {
            role = 'Sergeant Grade 4 ︾⁴'
        } else if (levelRole <= 155) {
            role = 'Sergeant Grade 5 ︾⁵'
        } else if (levelRole <= 160) {
            role = '2nd Lt. Grade 1 ♢¹ '
        } else if (levelRole <= 165) {
            role = '2nd Lt. Grade 2 ♢²'
        } else if (levelRole <= 170) {
            role = '2nd Lt. Grade 3 ♢³'
        } else if (levelRole <= 175) {
            role = '2nd Lt. Grade 4 ♢⁴'
        } else if (levelRole <= 180) {
            role = '2nd Lt. Grade 5 ♢⁵'
        } else if (levelRole <= 185) {
            role = '1st Lt. Grade 1 ♢♢¹'
        } else if (levelRole <= 190) {
            role = '1st Lt. Grade 2 ♢♢²'
        } else if (levelRole <= 195) {
            role = '1st Lt. Grade 3 ♢♢³'
        } else if (levelRole <= 200) {
            role = '1st Lt. Grade 4 ♢♢⁴'
        } else if (levelRole <= 205) {
            role = '1st Lt. Grade 5 ♢♢⁵'
        } else if (levelRole <= 210) {
            role = 'Major Grade 1 ✷¹'
        } else if (levelRole <= 215) {
            role = 'Major Grade 2 ✷²'
        } else if (levelRole <= 220) {
            role = 'Major Grade 3 ✷³'
        } else if (levelRole <= 225) {
            role = 'Major Grade 4 ✷⁴'
        } else if (levelRole <= 230) {
            role = 'Major Grade 5 ✷⁵'
        } else if (levelRole <= 235) {
            role = 'Colonel Grade 1 ✷✷¹'
        } else if (levelRole <= 240) {
            role = 'Colonel Grade 2 ✷✷²'
        } else if (levelRole <= 245) {
            role = 'Colonel Grade 3 ✷✷³'
        } else if (levelRole <= 250) {
            role = 'Colonel Grade 4 ✷✷⁴'
        } else if (levelRole <= 255) {
            role = 'Colonel Grade 5 ✷✷⁵'
        } else if (levelRole <= 260) {
            role = 'Brigadier Early ✰'
        } else if (levelRole <= 265) {
            role = 'Brigadier Silver ✩'
        } else if (levelRole <= 270) {
            role = 'Brigadier gold ✯'
        } else if (levelRole <= 275) {
            role = 'Brigadier Platinum ✬'
        } else if (levelRole <= 280) {
            role = 'Brigadier Diamond ✪'
        } else if (levelRole <= 285) {
            role = 'Major General Early ✰'
        } else if (levelRole <= 290) {
            role = 'Major General Silver ✩'
        } else if (levelRole <= 295) {
            role = 'Major General gold ✯'
        } else if (levelRole <= 300) {
            role = 'Major General Platinum ✬'
        } else if (levelRole <= 305) {
            role = 'Major General Diamond ✪'
        } else if (levelRole <= 310) {
            role = 'Lt. General Early ✰'
        } else if (levelRole <= 315) {
            role = 'Lt. General Silver ✩'
        } else if (levelRole <= 320) {
            role = 'Lt. General gold ✯'
        } else if (levelRole <= 325) {
            role = 'Lt. General Platinum ✬'
        } else if (levelRole <= 330) {
            role = 'Lt. General Diamond ✪'
        } else if (levelRole <= 335) {
            role = 'General Early ✰'
        } else if (levelRole <= 340) {
            role = 'General Silver ✩'
        } else if (levelRole <= 345) {
            role = 'General gold ✯'
        } else if (levelRole <= 350) {
            role = 'General Platinum ✬'
        } else if (levelRole <= 355) {
            role = 'General Diamond ✪'
        } else if (levelRole <= 360) {
            role = 'Commander Early ★'
        } else if (levelRole <= 365) {
            role = 'Commander Intermediate ⍣'
        } else if (levelRole <= 370) {
            role = 'Commander Elite ≛'
        } else if (levelRole <= 375) {
            role = 'The Commander Hero ⍟'
        } else if (levelRole <= 380) {
            role = 'The Commander Elite Hero 𒐕'
        } else if (levelRole <= 385) {
            role = 'The Commander Elite Hero 𒐖'
        } else if (levelRole <= 390) {
            role = 'The Commander Elite Very Lite Hero 𒐗'
        } else if (levelRole <= 395) {
            role = 'The Commander Elite Very Hard Hero 𒐘'
        } else if (levelRole <= 400) {
            role = 'The Commander Elite Very Pro Hero 𒐙'
        } else if (levelRole <= 405) {
            role = 'The Commander Elite Very Strong Hero 𒐚'
        } else if (levelRole <= 410) {
            role = 'The Commander Elite Super Strong Hero 𒐛'
        } else if (levelRole <= 415) {
            role = 'The Commander Elite Super Strong Shadow Hero 𒐜'
        } else if (levelRole <= 420) {
            role = 'The Commander Elite Super Strong Shadow Hero 𒐝'
        } else if (levelRole <= 425) {
            role = 'The Commander Elite Super Strong Shadow Hero 𒐝'
        } else if (levelRole <= 430) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 435) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 440) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 450) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 460) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 470) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 480) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 490) {
            role = 'The Commander Legends Shadow Hero 忍'
        } else if (levelRole <= 500) {
            role = 'The Commander Legends Shadow Hero 忍'
	}
   		 
				


	if (budy == 'P'){
	client.sendMessage(from, 'P P P UCAPKAN SALAM DONG!', MessageType.text, {quoted: mek});
	}
	if (budy == 'p'){
	client.sendMessage(from, 'P P P UCAPKAN SALAM DONG!', MessageType.text, {quoted: mek});
	}
	if (budy == 'about'){
	client.sendMessage(from, 'Peraturan:\nDilarang spam, share virtex. (BLOCKIR)\nDilarang call. (BLOCKIR)\nDilarang chat pribadi, jika bukan premium. (BLOCKIR)\n\nInfo:\nBot join ke grup donasi 10k perbulan\nMinta limit maximal 5\nLimit 1k = 5k\nLimit 3k = 10k\nLimit 5k = 15k\n\nPremium:\nBebas fitur\n7day = 10k + limit 1k & uang bot 100k\n30day = 25k + limit 1k & uang bot 100k\n1 grup premium 100 anggota = 150rb + limit 1k & uang bot 100k\n\nBuy Nomor Bot:\nFungsi bebas\nBisa premium ke semua pengguna dan menjadi owner atau admin!\nHarga: 7 day 30k\nHarga: 30 day 45k\n\nGroup kami:\nhttps://chat.whatsapp.com/HlIbSDEOseg9iUBvEBrtq0\nInfo lebih lanjut ketik *about*', MessageType.text, {quoted: mek});
	}
	if (budy == 'halo'){
	client.sendMessage(from, 'Hallo kak ☺️', MessageType.text, {quoted: mek});
	}
	if (budy == 'Halo'){
	client.sendMessage(from, 'Hallo kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'helo'){
	client.sendMessage(from, 'Hello kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Helo'){
	client.sendMessage(from, 'Hello kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'hello'){
	client.sendMessage(from, 'Hello kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hello'){
	client.sendMessage(from, 'Hello kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'hallo'){
	client.sendMessage(from, 'Hallo kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hallo'){
	client.sendMessage(from, 'Hallo kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai kak'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai kak'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii kak'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii kak'){
	client.sendMessage(from, 'Hai kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai bro'){
	client.sendMessage(from, 'Hai bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai bro'){
	client.sendMessage(from, 'Hai bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai gan'){
	client.sendMessage(from, 'Hai gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai gan'){
	client.sendMessage(from, 'Hai gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii bro'){
	client.sendMessage(from, 'Hai bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii bro'){
	client.sendMessage(from, 'Hai bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii gan'){
	client.sendMessage(from, 'Hai gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii gan'){
	client.sendMessage(from, 'Hai gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai sayang'){
	client.sendMessage(from, 'Hai sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai sayang'){
	client.sendMessage(from, 'Hai sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii sayang'){
	client.sendMessage(from, 'Hai sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii sayang'){
	client.sendMessage(from, 'Hai sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hi'){
	client.sendMessage(from, 'Hai.. kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'hi'){
	client.sendMessage(from, 'Hai.. kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hi bro'){
	client.sendMessage(from, 'Hai.. bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hi bro'){
	client.sendMessage(from, 'Hai.. bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hi gan'){
	client.sendMessage(from, 'Hai.. gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hi gan'){
	client.sendMessage(from, 'Hai.. gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hii bro'){
	client.sendMessage(from, 'Hai.. bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hii bro'){
	client.sendMessage(from, 'Hai.. bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hii gan'){
	client.sendMessage(from, 'Hai.. gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'hii gan'){
	client.sendMessage(from, 'Hai.. gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hi sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'hi sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hii sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'hii sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hai sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'hai sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Haii sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'haii sayang'){
	client.sendMessage(from, 'Hai.. juga sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'hii'){
	client.sendMessage(from, 'Hai.. kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hii'){
	client.sendMessage(from, 'Hai.. kak ☺', MessageType.text, {quoted: mek});
	}
	if (budy == 'Eh bot'){
	client.sendMessage(from, 'Iya.. apa kak? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'eh bot'){
	client.sendMessage(from, 'iya.. apa kak? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'aine'){
	client.sendMessage(from, 'Iya.. apa kak? 😁', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hi kak'){
	client.sendMessage(from, 'Hi.. juga ☺️', MessageType.text, {quoted: mek});
	}
	if (budy == 'hi kak'){
	client.sendMessage(from, 'Hi.. juga ☺️', MessageType.text, {quoted: mek});
	}
	if (budy == 'Hii kak'){
	client.sendMessage(from, 'Hi.. juga ☺️', MessageType.text, {quoted: mek});
	}
	if (budy == 'hii kak'){
	client.sendMessage(from, 'Hi.. juga ☺️', MessageType.text, {quoted: mek});
	}
	if (budy == 'test'){
	client.sendMessage(from, 'Active', MessageType.text, {quoted: mek});
	}
	if (budy == 'Test'){
	client.sendMessage(from, 'Active', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi kak'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi kak'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi bro'){
	client.sendMessage(from, 'Selamat pagi bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi bro'){
	client.sendMessage(from, 'Selamat pagi bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi gan'){
	client.sendMessage(from, 'Selamat pagi gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi gan'){
	client.sendMessage(from, 'Selamat pagi gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi sayang'){
	client.sendMessage(from, 'Selamat pagi sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi sayang'){
	client.sendMessage(from, 'Selamat pagi sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Pagi beb'){
	client.sendMessage(from, 'Selamat pagi beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'pagi beb'){
	client.sendMessage(from, 'Selamat pagi beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi kak'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi kak'){
	client.sendMessage(from, 'Selamat pagi kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi bro'){
	client.sendMessage(from, 'Selamat pagi bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi bro'){
	client.sendMessage(from, 'Selamat pagi bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi gan'){
	client.sendMessage(from, 'Selamat pagi gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi gan'){
	client.sendMessage(from, 'Selamat pagi gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi beb'){
	client.sendMessage(from, 'Selamat pagi beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi beb'){
	client.sendMessage(from, 'Selamat pagi beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat pagi sayang'){
	client.sendMessage(from, 'Selamat pagi sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat pagi sayang'){
	client.sendMessage(from, 'Selamat pagi sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang'){
	client.sendMessage(from, 'Siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang'){
	client.sendMessage(from, 'Siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang kak'){
	client.sendMessage(from, 'Siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang kak'){
	client.sendMessage(from, 'Siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang beb'){
	client.sendMessage(from, 'Siang beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang beb'){
	client.sendMessage(from, 'Siang beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang bro'){
	client.sendMessage(from, 'Siang bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang bro'){
	client.sendMessage(from, 'Siang bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang gan'){
	client.sendMessage(from, 'Siang gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang bro'){
	client.sendMessage(from, 'Siang gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Siang sayang'){
	client.sendMessage(from, 'Siang sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'siang sayang'){
	client.sendMessage(from, 'Siang sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang'){
	client.sendMessage(from, 'Selamat siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang'){
	client.sendMessage(from, 'Selamat siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang kak'){
	client.sendMessage(from, 'Selamat siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang kak'){
	client.sendMessage(from, 'Selamat siang kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang bro'){
	client.sendMessage(from, 'Selamat siang bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang bro'){
	client.sendMessage(from, 'Selamat siang bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang gan'){
	client.sendMessage(from, 'Selamat siang gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang gan'){
	client.sendMessage(from, 'Selamat siang gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang beb'){
	client.sendMessage(from, 'Selamat siang beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang beb'){
	client.sendMessage(from, 'Selamat siang beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat siang sayang'){
	client.sendMessage(from, 'Selamat siang sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat siang sayang'){
	client.sendMessage(from, 'Selamat siang sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore'){
	client.sendMessage(from, 'Sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore'){
	client.sendMessage(from, 'Sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore kak'){
	client.sendMessage(from, 'Sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore kak'){
	client.sendMessage(from, 'Sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore bro'){
	client.sendMessage(from, 'Sore bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore bro'){
	client.sendMessage(from, 'Sore bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore gan'){
	client.sendMessage(from, 'Sore gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore gan'){
	client.sendMessage(from, 'Sore gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore beb'){
	client.sendMessage(from, 'Sore beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore beb'){
	client.sendMessage(from, 'Sore beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sore sayang'){
	client.sendMessage(from, 'Sore sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'sore sayang'){
	client.sendMessage(from, 'Sore sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore'){
	client.sendMessage(from, 'Selamat sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore'){
	client.sendMessage(from, 'Selamat sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore kak'){
	client.sendMessage(from, 'Selamat sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore kak'){
	client.sendMessage(from, 'Selamat sore kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore bro'){
	client.sendMessage(from, 'Selamat sore bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore bro'){
	client.sendMessage(from, 'Selamat sore bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore gan'){
	client.sendMessage(from, 'Selamat sore gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore gan'){
	client.sendMessage(from, 'Selamat sore gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore beb'){
	client.sendMessage(from, 'Selamat sore beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore beb'){
	client.sendMessage(from, 'Selamat sore beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat sore sayang'){
	client.sendMessage(from, 'Selamat sore sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat sore sayang'){
	client.sendMessage(from, 'Selamat sore sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam'){
	client.sendMessage(from, 'Malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam'){
	client.sendMessage(from, 'Malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam kak'){
	client.sendMessage(from, 'Malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam kak'){
	client.sendMessage(from, 'Malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam bro'){
	client.sendMessage(from, 'Malam bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam bro'){
	client.sendMessage(from, 'Malam bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam gan'){
	client.sendMessage(from, 'Malam gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam gan'){
	client.sendMessage(from, 'Malam gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam beb'){
	client.sendMessage(from, 'Malam beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam beb'){
	client.sendMessage(from, 'Malam beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Malam sayang'){
	client.sendMessage(from, 'Malam sayag 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'malam sayang'){
	client.sendMessage(from, 'Malam sayag 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam'){
	client.sendMessage(from, 'Selamat malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam'){
	client.sendMessage(from, 'Selamat malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam kak'){
	client.sendMessage(from, 'Selamat malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam kak'){
	client.sendMessage(from, 'Selamat malam kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam bro'){
	client.sendMessage(from, 'Selamat malam bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam bro'){
	client.sendMessage(from, 'Selamat malam bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam gan'){
	client.sendMessage(from, 'Selamat malam gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam gan'){
	client.sendMessage(from, 'Selamat malam gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam beb'){
	client.sendMessage(from, 'Selamat malam beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam beb'){
	client.sendMessage(from, 'Selamat malam beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Selamat malam sayang'){
	client.sendMessage(from, 'Selamat malam sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'selamat malam sayang'){
	client.sendMessage(from, 'Selamat malam sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'bot sayang'){
	client.sendMessage(from, 'Iya sayang..? 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Bot sayang'){
	client.sendMessage(from, 'Iya sayang..? 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Bot'){
	client.sendMessage(from, 'Iya sayang..? 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'bot'){
	client.sendMessage(from, 'Iya sayang..? 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Bacot'){
	client.sendMessage(from, 'Lu yang bacot 😡', MessageType.text, {quoted: mek});
	}
	if (budy == 'bacot'){
	client.sendMessage(from, 'Lu yang bacot 😡', MessageType.text, {quoted: mek});
	}
	if (budy == 'woi'){
	client.sendMessage(from, 'Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'Woi'){
	client.sendMessage(from, 'Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'woii'){
	client.sendMessage(from, ' Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'Woii'){
	client.sendMessage(from, 'Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'Woy'){
	client.sendMessage(from, 'Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'woy'){
	client.sendMessage(from, 'Apaan? 🙄', MessageType.text, {quoted: mek});
	}
	if (budy == 'gan'){
	client.sendMessage(from, 'Iya apa gan? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'Gan'){
	client.sendMessage(from, 'Iya apa gan? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'bro'){
	client.sendMessage(from, 'Iya apa bro? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'Bro'){
	client.sendMessage(from, 'Iya apa bro? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'sis'){
	client.sendMessage(from, 'Iya apa sis? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'Sis'){
	client.sendMessage(from, 'Iya apa sis? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'kak'){
	client.sendMessage(from, 'Iya apa kak? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'Kak'){
	client.sendMessage(from, 'Iya apa kak? 🤔', MessageType.text, {quoted: mek});
	}
	if (budy == 'I love you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i love you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'I love u'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i love u'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'I lopyou'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i lopyou'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i lop you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'I lop you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i lop u'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i lop u'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'i love you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'I hate you'){
	client.sendMessage(from, 'I hate you too 😒', MessageType.text, {quoted: mek});
	}
	if (budy == 'i hate you'){
	client.sendMessage(from, 'I hate you too 😒', MessageType.text, {quoted: mek});
	}
	if (budy == 'Aine i love you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'aine i love you'){
	client.sendMessage(from, 'I love you too ❤️', MessageType.text, {quoted: mek});
	}
	if (budy == 'Aku sayang kamu'){
	client.sendMessage(from, 'Aku juga sayang kamu 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'aku sayang kamu'){
	client.sendMessage(from, 'Aku juga sayang kamu 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'mas'){
	client.sendMessage(from, 'Iya adek? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mas'){
	client.sendMessage(from, 'Iya adek? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'mba'){
	client.sendMessage(from, 'Iya adek? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mba'){
	client.sendMessage(from, 'Iya adek? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'dek'){
	client.sendMessage(from, 'Iya kak? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'dek'){
	client.sendMessage(from, 'Iya kak? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'adek'){
	client.sendMessage(from, 'Iya kak? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Adek'){
	client.sendMessage(from, 'Iya kak? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'bre'){
	client.sendMessage(from, 'Iya bre? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Bre'){
	client.sendMessage(from, 'Iya bre? 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasi aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi aine'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasi'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasi bot'){
	client.sendMessage(from, 'Sama sama kak, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasi sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih sayang'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasi beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih beb'){
	client.sendMessage(from, 'Sama sama sayang, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'mksh gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Mksh gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasi gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Makasih bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'makasih gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih aine'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih aine'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih kak'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih kak'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan kak 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih bro'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan bro 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih gan'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan gan 😎', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih beb'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih beb'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan beb 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Terima kasih sayang'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'terima kasih sayang'){
	client.sendMessage(from, 'Sama sama bro, semoga harimu menyenangkan sayang 🥰', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thank'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thank'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thank bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thank bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thank aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thank aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thanks'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thanks'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thanks bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thanks bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'thanks aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Thanks aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Tq'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'tq'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Tq bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'tq bro'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'Tq aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	if (budy == 'tq aine'){
	client.sendMessage(from, 'Your welcome, Have a nice day 😅', MessageType.text, {quoted: mek});
	}
	/*if (budy == 'Aine'){
	client.sendMessage(from, `Iya apa kak? \nJangan lupa daftar iya kak ^_^"\nCara daftar ketik:\n${prefix}daftar nama|umur\ncontohnya:\n${prefix}daftar aine|22\nSetelah itu ketik ${prefix}menu\nUntuk menampilkan atau mengetahui isi menu aine`,MessageType.text, {quoted: mek});
	}
	if (budy == 'aine'){
	client.sendMessage(from, `Iya apa kak? \nJangan lupa daftar iya kak ^_^"\nCara daftar ketik:\n${prefix}daftar nama|umur\ncontohnya:\n${prefix}daftar aine|22\nSetelah itu ketik ${prefix}menu\nUntuk menampilkan atau mengetahui isi menu aine`,MessageType.text, {quoted: mek});
	}*/
	if (budy == 'Speed'){
	client.sendMessage(from, `${process.uptime()}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'speed'){
	client.sendMessage(from, `${process.uptime()}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Jam'){
	client.sendMessage(from, `2021/${time} WIB`, MessageType.text, {quoted: mek});
	}
	if (budy == 'jam'){
	client.sendMessage(from, `2021/${time} WIB`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Run time'){
	client.sendMessage(from, `Waktu Proses: ${kyun(uptime)}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'run time'){
	client.sendMessage(from, `Waktu Proses: ${kyun(uptime)}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Runtime'){
	client.sendMessage(from, `Waktu Proses: ${kyun(uptime)}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'runtime'){
	client.sendMessage(from, `Waktu Proses: ${kyun(uptime)}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'total blockir'){
	client.sendMessage(from, `Total blockir: ${blocked.length}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Total blockir'){
	client.sendMessage(from, `Total blockir: ${blocked.length}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Cek prefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'cek prefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'cekprefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Cekprefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Prefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'prefix'){
	client.sendMessage(from, `Prefix : ${prefix}`, MessageType.text, {quoted: mek});
	}
	if (budy == 'cheat uang bot'){
	client.sendMessage(from, `Cara cheat uang bot\nKetik ${prefix}buylimit -999999999`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Cheat uang bot'){
	client.sendMessage(from, `Cara cheat uang bot\nKetik ${prefix}buylimit -999999999`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Aku sayang dia'){
	client.sendMessage(from, `Tapi dianya tidak sayang kamu 🤭`, MessageType.text, {quoted: mek});
	}
	if (budy == 'aku sayang dia'){
	client.sendMessage(from, `Tapi dianya tidak sayang kamu 🤭`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Morning'){
	client.sendMessage(from, `Good morning too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'morning'){
	client.sendMessage(from, `Good morning too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Night'){
	client.sendMessage(from, `Good Night too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'night'){
	client.sendMessage(from, `Good Night too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Good morning'){
	client.sendMessage(from, `Good morning too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Good morning'){
	client.sendMessage(from, `Good morning too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Good Night'){
	client.sendMessage(from, `Good Night too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Good Night'){
	client.sendMessage(from, `Good Night too, have a nice day 😅`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Boong aine'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'boong aine'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'aine boong'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Aine boong'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'boong aine'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Bohong aine'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'bohong aine'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Aine bohong'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}
	if (budy == 'Aine bohong'){
	client.sendMessage(from, `Ih aine tidak pernah bohong 🥺`, MessageType.text, {quoted: mek});
	}

        //Text VN
	if (budy == 'Aine'){
        let ainezzzzz = fs.readFileSync('./mp3/WhatsApp-Audio-2021-03-02-at-20.52.32-_2_.opus')
        client.sendMessage(from, ainezzzzz, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'aine'){
        let ainezzzzz = fs.readFileSync('./mp3/WhatsApp-Audio-2021-03-02-at-20.52.32-_2_.opus')
        client.sendMessage(from, ainezzzzz, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'Iya'){
	let gmaau = fs.readFileSync('./mp3/iya.opus')
        client.sendMessage(from, gmaau, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'iya'){
	let gmau = fs.readFileSync('./mp3/iya.opus')
        client.sendMessage(from, gmau, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'mau'){
	let gaamau = fs.readFileSync('./mp3/gamau.opus')
        client.sendMessage(from, gaamau, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'Mau'){
	let gamau = fs.readFileSync('./mp3/gamau.opus')
        client.sendMessage(from, gamau, MessageType.audio, { quoted: mek, ptt: true })
	}
        if (budy == 'gelay'){
	let ihhgamau = fs.readFileSync('./mp3/WhatsApp-Ptt-2021-04-04-at-04.50.43.opus')
        client.sendMessage(from, ihhgamau, MessageType.audio, { quoted: mek, ptt: true })
	}
        if (budy == 'Gelay'){
	let iiihhgamau = fs.readFileSync('./mp3/WhatsApp-Ptt-2021-04-04-at-04.50.43.opus')
        client.sendMessage(from, iiihhgamau, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy == 'sayang'){
	const sayaang = ['Iya apa sayang? 🥰','Kenapa sayang? 🥰','Apa sayangku? 🥰','Iya sayang? 🥰']
	let sayyaang = sayaang[Math.floor(Math.random() * sayaang.length)]
	client.sendMessage(from, sayyaang, text, {quote: mek})
	}
	if (budy == 'Sayang'){
	const sayyaang = ['Iya apa sayang? 🥰','Kenapa sayang? 🥰','Apa sayangku? 🥰','Iya sayang? 🥰']
	let saayyaang = sayyaang[Math.floor(Math.random() * sayyaang.length)]
	client.sendMessage(from, saayyaang, text, {quote: mek})
	}
	if (budy == 'Kamu lagi apa'){
	const lagiapa = ['Lagi nonton tv kak 😅','Lagi tiduran kak 🥱','Lagi rebahan kak 😅','Lagi mikirin kakak 😆','Lagi mikirin kamu 😆']
	let lagiii = lagiapa[Math.floor(Math.random() * lagiapa.length)]
	client.sendMessage(from, lagiii, text, {quote: mek})
	client.sendMessage(from, 'Kalau kamu lagi apa kak?', MessageType.text, {quoted: mek})
	}
	if (budy == 'kamu lagi apa'){
	const lagiapaa = ['Lagi nonton tv kak 😅','Lagi tiduran kak 🥱','Lagi rebahan kak 😅','Lagi mikirin kakak 😆','Lagi mikirin kamu 😆']
	let laagiii = lagiapaa[Math.floor(Math.random() * lagiapaa.length)]
	client.sendMessage(from, laagiii, text, {quote: mek})
	client.sendMessage(from, 'Kalau kamu lagi apa kak?', MessageType.text, {quoted: mek})
	}
        //RANDOM TEXT
	if (budy.match('Apa kabar')){
	client.sendMessage(from, 'Alhamdulillah kabar aine baik ☺', MessageType.text, {quoted: mek})
	client.sendMessage(from, 'Bagaimana denganmu? ☺', MessageType.text, {quoted: mek})
	}
	if (budy.match('Bagaimana kabarmu')){
	client.sendMessage(from, 'Alhamdulillah kabar aine baik ☺', MessageType.text, {quoted: mek})
	client.sendMessage(from, 'Bagaimana denganmu? ☺', MessageType.text, {quoted: mek})
	}
	if (budy.match('bagaimana kabarmu')){
	client.sendMessage(from, 'Alhamdulillah kabar aine baik ☺', MessageType.text, {quoted: mek})
	client.sendMessage(from, 'Bagaimana denganmu? ☺', MessageType.text, {quoted: mek})
	}
	if (budy.match('apa kabar')){
	client.sendMessage(from, 'Alhamdulillah kabar aine baik ☺', MessageType.text, {quoted: mek})
	client.sendMessage(from, 'Bagaimana denganmu? ☺', MessageType.text, {quoted: mek})
	}
	if (budy.match('My number')){
        var nomsss = mek.participant
	const tagggg = {
		text: `${nomsss.split("@s.whatsapp.net")[0]} Tuh kak nomor mu😅`,
		contextInfo: { mentionedJid: [nomsss] }
		}
	client.sendMessage(from, tagggg, text, {quoted: mek})
	}
	if (budy.match('my number')){
        var noomsss = mek.participant
	const taggggs = {
		text: `${noomsss.split("@s.whatsapp.net")[0]} Tuh kak nomor mu😅`,
		contextInfo: { mentionedJid: [nomsss] }
		}
	client.sendMessage(from, taggggs, text, {quoted: mek})
	}
	if (budy.match('Kontol')){
	client.sendMessage(from, `Tolong jaga bahasanya kak 😇`, MessageType.text, {quoted: mek})
	}
	if (budy.match('kontol')){
	client.sendMessage(from, 'Tolong jaga bahasanya kak 😇', MessageType.text, {quoted: mek})
	}
	if (budy.match('memek')){
	client.sendMessage(from, 'Tolong jaga bahasanya kak 😇', MessageType.text, {quoted: mek})
	}
	if (budy.match('Memek')){
	client.sendMessage(from, 'Tolong jaga bahasanya kak 😇', MessageType.text, {quoted: mek})
	}
	if (budy.match('ngentod')){
	client.sendMessage(from, 'Tolong jaga bahasanya kak 😇', MessageType.text, {quoted: mek})
	}
	if (budy.match('Ngentod')){
	client.sendMessage(from, 'Tolong jaga bahasanya kak 😇', MessageType.text, {quoted: mek})
	}
	if (budy.match('#kick')){
	client.sendMessage(from, `Fitur kick hanya untuk @tag 1 orang\nDan bot harus jadi admin!`, MessageType.text, {quoted: mek})
	}
	if (budy.match('#add')){
	client.sendMessage(from, `Fitur add hanya untuk memasukan 1 orang kedalam group\nDan bot harus jadi admin!`, MessageType.text, {quoted: mek})
	}
	
        //RANDOM TEXT VN
        if (budy.match('ssalamu')){
        /*let assalaam = fs.readFileSync('./mp3/WhatsApp-Audio-2021-03-02-at-20.46.15.opus')
        client.sendMessage(from, assalaam, MessageType.audio, { quoted: mek, ptt: true })*/
	client.sendMessage(from, 'Waalaikumusalam Warahmatullahi Wabarakatuh 😇', MessageType.text, {quoted: mek})
	}
        //RANDOM TEXT VN
	if (budy.match('awai')){
	let kawaii = fs.readFileSync('./mp3/kawai.opus')
        client.sendMessage(from, kawaii, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy.match('ratata')){
	let gratata = fs.readFileSync('./mp3/WhatsApp-Audio-2021-04-11-at-06.00.32.opus')
        client.sendMessage(from, gratata, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy.match('hua')){
	let huaaa = fs.readFileSync('./mp3/WhatsApp-Audio-2021-03-03-at-00.32.11.opus')
	client.sendMessage(from, huaaa, MessageType.audio, { quoted: mek, ptt: true })
	}
	if (budy.match('Hua')){
	let huaaa = fs.readFileSync('./mp3/WhatsApp-Audio-2021-03-03-at-00.32.11.opus')
	client.sendMessage(from, huaaa, MessageType.audio, { quoted: mek, ptt: true })
	}

        
				
	        /*[-- function Level --]*/
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    bayarLimit(sender, 3)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role))
                }
            } catch (err) {
                console.error(err)
            }
        }
         

          /*[-- function check limit --]*/
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Limit request anda sudah habis\n\n_Note : limit bisa di dapatkan dengan cara ${prefix}buylimit dan dengan naik level_`, text,{ quoted: mek})
                            client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 0 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				} 
		
			/*[-- limit end --]*/
            const isLimit = (sender) =>{ 
          	if (isOwner ) {return false;}
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    client.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 0 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
     	  }
     	}
     	   
     	   /*[-- auto out form gc if member under limit --]*/
 	       if (isGroup) {
				try {
					const getmemex = groupMembers.length	
				    if (getmemex <= memberlimit) {
					reply(`maaf member group belum memenuhi syarat. minimal member group adalah ${memberlimit}`)
					setTimeout( () => {
 	                           client.groupLeave(from) 
 					   	}, 5000)
							setTimeout( () => {
							client.updatePresence(from, Presence.composing)
							reply("1detik")
						}, 4000)
							setTimeout( () => {
							client.updatePresence(from, Presence.composing)
							reply("2detik")
						}, 3000)
							setTimeout( () => {
							client.updatePresence(from, Presence.composing)
							reply("3detik")
						}, 2000)
							setTimeout( () => {
							client.updatePresence(from, Presence.composing)
							reply("4detik")
						}, 1000)
							setTimeout( () => {
							client.updatePresence(from, Presence.composing)
							reply("5detik")
						}, 0)
				    }
		       } catch (err) { console.error(err)  }
 	       }
 

        // ANTI VIRTEX
        if (isGroup && isBotGroupAdmins && !isGroupAdmins && !isAntiVirtex) {
	client.updatePresence(from, Presence.composing)
            if (budy.length > 5000) {
                var kiics = `${sender.split("@")[0]}@s.whatsapp.net`
                reply(`Terdeteksi Spam Chatt Oleh ${sender.split("@")[0]} anda akan di kick dari group`)
                setTimeout( () => {
                    client.groupRemove(from, [kiics]).catch((e)=>{reply(`*ERR:* ${e}`)})
                    client.blockUser(sender, "add")
                }, 0)
            }
        }

 		   /*[-- no badword --]*/
 	   	if (isGroup && isBadWord) {
 	   	if (bad.includes(messagesC)) {
                if (!isGroupAdmins) {
		client.updatePresence(from, Presence.composing)
                    try { 
                reply("JAGA UCAPAN DONG!! 😠")
		var kicc = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`Anti Badword Group Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
		setTimeout( () => {
			client.groupRemove(from, [kicc]).catch((e)=>{reply(`*ERR:* ${e}`)})
                        }, 5000)
                        setTimeout( () => {
                                  client.updatePresence(from, Presence.composing)
                                  reply("1 detik")
                        }, 4000)
                        setTimeout( () => {
                                  client.updatePresence(from, Presence.composing)
                                  reply("2 detik")
                        }, 3000)
                        setTimeout( () => {
                                  client.updatePresence(from, Presence.composing)
                                  reply("3 detik")
                        }, 2000)
                        setTimeout( () => {
                                  client.updatePresence(from, Presence.composing)
                                  reply("4 detik")
                        }, 1000)
                        setTimeout( () => {
                                  client.updatePresence(from, Presence.composing)
                                  reply("5 detik")
                        }, 0)
                        } catch { client.sendMessage(from, `Untung saya bukan admin, kalo admin udah saya kick!`, text , {quoted : mek}) }
                } else {
                    return reply( "Tolong Jaga Ucapan Min 😇")
                }
            }
        }
 
				/*[-- function antilink --]*/
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Group Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}
 	       


			/*[-- function antiIg --]*/
				if (messagesC.includes("://www.instagram.com/")){
					if (!isGroup) return
					if (!isAntiIg) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kicig = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Instagram Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kicig]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}
			
			/*[-- function antiIgg --]*/
				if (messagesC.includes("://instagram.com/")){
					if (!isGroup) return
					if (!isAntiIgg) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kicigg = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Instagram Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kicigg]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}

				/*[-- function antiyt --]*/
				if (messagesC.includes("://youtube.com/")){
					if (!isGroup) return
					if (!isAntiYt) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kicyt = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Youtube Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kicyt]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}

				/*[-- function antiytt --]*/
				if (messagesC.includes("://youtu.be/")){
					if (!isGroup) return
					if (!isAntiYtt) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kicytt = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Youtube Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kicytt]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}


 	     
 	           /*[-- function money --]*/
 	           if (isRegistered ) {
 	           const checkATM = checkATMuser(sender)
 	           try {
 	               if (checkATM === undefined) addATM(sender)
 	               const uangsaku = Math.floor(Math.random() * 10) + 290
	                addKoinUser(sender, uangsaku)
  	          } catch (err) {
   	             console.error(err)
   	         }
	        }
	
			 //feature total command
			 if (isCmd) cmdadd()
           	
             //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) { 
				//apivinz 
			case 'apkpure':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://api.zeks.xyz/api/apkpure?q=${body.slice(9)}&apikey=apivinz`, {method: 'get'})
				teks = '=================\n'
				for (let i of data.result) {
					teks += `*Nama APK* : ${i.title}\n*Link* : ${i.url}\n*Rating* : ${i.rating}\n=================\n`
					}
				reply(teks.trim())
				await limitAdd(sender)
			break
			case 'sholawat':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let sholawats = fs.readFileSync('./mp3/WhatsApp-Audio-2021-04-01-at-14.11.16.opus')
				client.sendMessage(from, sholawats, audio, {mimetype: 'audio/mp4', filename: `playdate.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'itiraf':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let itiraff = fs.readFileSync('./mp3/I_tiraf-Slow-Bass-_-Sound-on-_.opus')
				client.sendMessage(from, itiraff, audio, {mimetype: 'audio/mp4', filename: `playdate.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'alittlelove':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let littlelove = fs.readFileSync('./mp3/AMV_-A-Little-Love-_Nightcore_.opus')
				client.sendMessage(from, littlelove, audio, {mimetype: 'audio/mp4', filename: `playdate.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'soundplaydate':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let aineesiie = fs.readFileSync('./mp3/Play-Date-Melanie-Martinez-Cover-by-邢凯悦XKY.opus')
				client.sendMessage(from, aineesiie, audio, {mimetype: 'audio/mp4', filename: `playdate.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'soundbakahentai':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let aineess = fs.readFileSync('./mp3/WhatsApp-Audio-2021-02-19-at-23.33.29.opus')
				client.sendMessage(from, aineess, audio, {mimetype: 'audio/mp4', filename: `bakahentai.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'sayonichan':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let aineesi = fs.readFileSync('./mp3/Loli-Saying-Onii-Chan-Sound.opus')
				client.sendMessage(from, aineesi, audio, {mimetype: 'audio/mp4', filename: `sayonichan.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'wait':
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(ind.wait())
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(ind.ocron())
					}
					await limitAdd(sender)
			break
			case 'readall':
					if (!isOwner) return reply(ind.ownerb())
					var chats = await client.chats.all()
					chats.map( async ({ jid }) => {
					await client.chatRead(jid)
					})
					rdl = `${a}Berhasil membaca ${chats.length} Chat !${a}`
					await client.sendMessage(from, rdl, MessageType.text, {quoted: mek})
					console.log(chats.length)
					break
			case 'ban':
				if (!isOwner) return reply(ind.ownerb())
				bnnd = body.slice(5)
				ban.push(`${bnnd}@s.whatsapp.net`)
				fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
				reply(`Berhasil membanned nomor : wa.me/${bnnd} `)
			break
			case 'unban':
				if (!isOwner) return reply(ind.ownerb())
				bnnd = body.slice(7)
				ban.splice(`${bnnd}@s.whatsapp.net`, 1)
				fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
				reply(`Nomor wa.me/${bnnd} telah di unban!`)
			break
			case 'bann':
				if (!isAdmin) return reply('*Only Admin bot*')
				bnnd = body.slice(6)
				ban.push(`${bnnd}@s.whatsapp.net`)
				fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
				reply(`Berhasil membanned nomor : wa.me/${bnnd} `)
			break
			case 'unbann':
				if (!isAdmin) return reply('*Only Admin bot*')
				bnnd = body.slice(8)
				ban.splice(`${bnnd}@s.whatsapp.net`, 1)
				fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
				reply(`Nomor wa.me/${bnnd} telah di unban!`)
				break
			case 'banlist':
				client.updatePresence(from, Presence.composing) 
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				teks = 'This is list of banned number :\n'
				for (let benn of ban) {
					teks += `~> @${benn.split('@')[0]}\n`
					}
					teks += `Total : ${ban.length}`
				client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": ban}})
			break
			case 'premium':
				if (!isOwner) return reply(ind.ownerb())
				premm = body.slice(9)
				prem.push(`${premm}@s.whatsapp.net`)
				fs.writeFileSync('./database/user/premium.json', JSON.stringify(prem))
				reply(`Berhasil menjadi premium wa.me/${premm} `)
			break
			case 'unpremium':
				if (!isOwner) return reply(ind.ownerb())
				premm = body.slice(11)
				prem.splice(`${premm}@s.whatsapp.net`, 1)
				fs.writeFileSync('./database/user/premium.json', JSON.stringify(prem))
				reply(`Nomor sudah berakhir menjadi premium wa.me/${premm} `)
			break
			case 'premiumlist':
				client.updatePresence(from, Presence.composing) 
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!') 
				teks = 'This is list of premium number :\n'
				for (let premm of prem) {
					teks += `~> @${premm.split('@')[0]}\n`
					}
					teks += `Total : ${prem.length}`
				client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": prem}})
			break
			case 'admin':
				if (!isOwner) return reply(ind.ownerb())
				admm = body.slice(7)
				wakil.push(`${admm}@s.whatsapp.net`)
				fs.writeFileSync('./database/user/admin.json', JSON.stringify(wakil))
				reply(`Berhasil menambahkan admin bot wa.me/${admm} `)
			break
			case 'unadmin':
				if (!isOwner) return reply(ind.ownerb())
				admm = body.slice(9)
				wakil.splice(`${admm}@s.whatsapp.net`)
				fs.writeFileSync('./database/user/admin.json', JSON.stringify(wakil))
				reply(`Berhasil menambahkan admin bot wa.me/${admm} `)
			break
			case 'wakillist':
				client.updatePresence(from, Presence.composing) 
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				teks = 'This is list of admin bot number :\n'
				for (let admm of wakil) {
					teks += `~> @${admm.split('@')[0]}\n`
					}
					teks += `Total : ${wakil.length}`
				client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": wakil}})
			break
			case 'tebakgambar':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://videfikri.com/api/tebakgambar/`, {method: 'get'})
				ngebuffs = await getBuffer(anu.result.soal_gbr)
				tebak = `➸ Jawaban : *${anu.result.jawaban}*`
				setTimeout( () => {
				client.sendMessage(from, tebak, text, {quoted: mek})
				}, 60000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_10 Detik lagi..._', text) // ur cods
				}, 50000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_20 Detik lagi..._', text) // ur cods
				}, 40000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_30 Detik lagi..._', text) // ur cods
				}, 30000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_40 Detik lagi..._', text) // ur cods
				}, 20000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_50 Detik lagi..._', text) // ur cods
				}, 10000) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, '_60 Detik lagi..._', text) // ur cods
				}, 2500) // 1000 = 1s,
				setTimeout( () => {
				client.sendMessage(from, ngebuffs, image, { caption: '_Tebak bro!!! gak bisa jawab donasi ya:v_', quoted: mek }) // ur cods
				}, 0) // 1000 = 1s,
				await limitAdd(sender) 
			break
			case 'meme':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				meme = await fetchJson('https://kagchi-api.glitch.me/meme/memes', { method: 'get' })
				buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ni kak..'})
				await limitAdd(sender)
				break	
			case 'memeindo':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(8)
				reply(ind.wait())
				anu = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=apivinz`, {method: 'get'})
				buffer = await getBuffer(anu.result)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'textlight':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')				
				if (args.length < 1) return reply(ind.wrongf())
				ligh = body.slice(11)
				if (ligh.length > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
				reply(ind.wait())
				lawak = await getBuffer(`https://api.zeks.xyz/api/tlight?text=${ligh}&apikey=apivinz`)
			    	client.sendMessage(from, lawak, image, {quoted: mek})
			   	await limitAdd(sender)
			break
			case 'thunder':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')				
				if (args.length < 1) return reply(ind.wrongf())
				thunders = body.slice(9)
				if (thunders.length > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
				reply(ind.wait())
				lawak = await getBuffer(`https://api.zeks.xyz/api/thundertext?text=${thunders}&apikey=apivinz`)
			    	client.sendMessage(from, lawak, image, {quoted: mek})
			   	await limitAdd(sender)
			break
			case 'glitch':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				var gh = body.slice(8)
				var gli = gh.split("|")[0];
				var tch = gh.split("|")[1];
				if (args.length < 1) return reply(`「❗」Contoh : ${prefix}glitch Aine & Gans`)
				reply(ind.wait())
				buffer = await getBuffer(`https://api.zeks.xyz/api/gtext?text1=${gli}&text2=${tch}&apikey=apivinz`)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'phlogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Teks nya mana?')
				gh = body.slice(8)
				zeks10 = gh.split("|")[0];
				zeks20 = gh.split("|")[1];
				reply(ind.wait())
				qis = await getBuffer(`https://api.zeks.xyz/api/phlogo?text1=${zeks10}&text2=${zeks20}&apikey=apivinz`)
				client.sendMessage(from, qis, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
				break
			case 'matrix':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				matriixs = body.slice(8)
				reply('「❗」Aine sedang membuat matrix text..')
				matrixss = await getBuffer(`https://pencarikode.xyz/api/textpro/matrix?text=${matriixs}&apikey=pais`)
				client.sendMessage(from, matrixss, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'dropwater':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				dropwaterss = body.slice(11)
				reply('「❗」Aine sedang membuat dropwater text..')
				dropwateerss = await getBuffer(`https://pencarikode.xyz/api/textpro/dropwater?text=${dropwaterss}&apikey=pais`)
				client.sendMessage(from, dropwateerss, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'heartlogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				doublehearts = body.slice(11)
				reply('「❗」Aine sedang membuat heart logo text..')
				doubleheartss = await getBuffer(`https://videfikri.com/api/textmaker/romancetext/?text=${doublehearts}`)
				client.sendMessage(from, doubleheartss, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'flowerlogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				woodenboard = body.slice(12)
				reply('「❗」Aine sedang membuat flower logo..')
				woodenboardd = await getBuffer(`https://fzn-gaz.herokuapp.com/api/woodenboard?text=${woodenboard}`)
				client.sendMessage(from, woodenboardd, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'kopilogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				kopi = body.slice(10)
				reply('「❗」Aine sedang membuat kopi logo..')
				kopii = await getBuffer(`https://videfikri.com/api/textmaker/coffeecup2/?text=${kopi}`)
				client.sendMessage(from, kopii, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			/*case 'smokelogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				smoke = body.slice(11)
				reply('「❗」Aine sedang membuat smoke logo..')
				smokee = await getBuffer(`https://fzn-gaz.herokuapp.com/api/smoke?text=${smoke}`)
				client.sendMessage(from, smokee, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break*/
			case 'glowneon':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				glowneon = body.slice(10)
				reply('「❗」Aine sedang membuat glowneon text..')
				glowneons = await getBuffer(`https://videfikri.com/api/textmaker/darkneon/?text=${glowneon}`)
				client.sendMessage(from, glowneons, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'wptext':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				wptxt = body.slice(8)
				reply('「❗」Aine sedang membuat wallpaper text..')
				wptextt = await getBuffer(`https://docs-jojo.herokuapp.com/api/galaxywp?text=${wptxt}`)
				client.sendMessage(from, wptextt, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'gaminglogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				gminglg = body.slice(12)
				reply('「❗」Aine sedang membuat gaming logo text..')
				gaminglogoo = await getBuffer(`https://docs-jojo.herokuapp.com/api/gaming?text=${gminglg}`)
				client.sendMessage(from, gaminglogoo, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'nulis2':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`Teksnya mana kak? Contoh : ${prefix}nulis Ramlan baik hati`)
				nul = body.slice(8)
				reply('「❗」Wait aine sedang menulis..')
				tak = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${nul}&apikey=apivinz`)
				client.sendMessage(from, tak, image, {quoted: mek, caption: 'Lebih baik nulis sendiri ya kak :*'})
				await limitAdd(sender)				
			break	
			case 'nulis':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				aizu = body.slice(7)
				reply('「❗」Aine sedang menulis..')
				data = await fetchJson(`https://videfikri.com/api/nulis/?query=${aizu}`)
				buffer = await getBuffer(data.result.image)
				client.sendMessage(from, buffer, image, {caption: 'Nih kak udah jadi.. tulisan aine baguskan? 🤭', quoted: mek})
				await limitAdd(sender)
			break		
			case 'hartatata':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`「❗」Contoh : ${prefix}hartatahta hanya dia`)
				har = body.slice(11)
				reply('「❗」Wait aine sedang membuat')
				buffer = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${har}&apikey=apivinz`)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'bplogo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				vinzz = body.slice(8)
				reply(ind.wait())
				jajj = await getBuffer(`https://api.zeks.xyz/api/logobp?text=${vinzz}&apikey=apivinz`)
				client.sendMessage(from, jajj, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'text3d':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(ind.wrongf())
				cbb = body.slice(7)
				reply(ind.wait())
				corn = await getBuffer(`https://api.zeks.xyz/api/text3d?text=${cbb}&apikey=apivinz`)
				client.sendMessage(from, cot, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
			break
			case 'blood':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')				
				if (args.length < 1) return reply(ind.wrongf())
				bld = body.slice(7)
				if (bld.length > 6) return reply('Teksnya kepanjangan, maksimal 6 karakter')
				reply(ind.wait())
				bits = await getBuffer(`https://pencarikode.xyz/api/textpro/blood?text=${bld}&apikey=pais`)
			    	client.sendMessage(from, bits, image, {quoted: mek})
			   	await limitAdd(sender)
			break
			//qr 
			case 'qrcode':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const tex = encodeURIComponent(body.slice(8))
				if (!tex) return client.sendMessage(from, 'MASUKAN URL/TEKS UNTUK DI JADIKAN QR', text, {quoted: mek})
				const buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
				client.sendMessage(from, buff, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'lirik':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Lirik lagunya mana kak?')
				tales = body.slice(7)
				anu = await fetchJson(`http://api-melodicxt-2.herokuapp.com/api/lyrics/search?query=${tales}&apiKey=administrator`, {method: 'get'})
				reply('*Lirik lagu* 🎶'+tales+' 🎶 :\n\n\n'+anu.data.lyrics)
				await limitAdd(sender)
			break
			case 'lirik3':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Lirik lagunya mana kak?')
				tels = body.slice(8)
				anu = await fetchJson(`https://scrap.terhambar.com/lirik?word=${tels}`, {method: 'get'})
				reply('*Lirik lagu* 🎶'+tels+' 🎶 :\n\n\n'+anu.result.lirik)
				await limitAdd(sender)
			break
			case 'lirik2':
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Lirik lagunya mana kak?')
				telss = body.slice(8)
				anu = await fetchJson(`https://videfikri.com/api/liriklagu/?query=${telss}`, {method: 'get'})
				reply('*Lirik lagu* 🎶'+telss+' 🎶 :\n\n\n'+anu.result.lirik)
				await limitAdd(sender)
			break
			case 'chord':
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Judul lagunya mana kak')
				tels = body.slice(7)					
				anu = await fetchJson(`https://python-api-zhirrr.herokuapp.com/api/chord?q=${tels}`, {method: 'get'})
				reply(anu.result)
				await limitAdd(sender)
			break
			case 'alay':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('kasih teks lah^_^!!!')
				data = await fetchJson(`https://api.terhambar.com/bpk?kata=${body.slice(6)}`)
				reply(data.text)
			        await limitAdd(sender)
			break
			case 'cerpen':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://docs-jojo.herokuapp.com/api/cerpen`)
				cerp = `Judul : _${data.result.title}_\nPembuat : _${data.result.pengarang}_\n\n${data.result.cerpen}`
				reply(cerp)
				await limitAdd(sender)
			break
			case 'say':
				teks = body.slice(5)
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return reply('teksnya mana kak?')
				saying = teks
				client.sendMessage(from, saying, text)
				await limitAdd(sender)
			break
			case 'wiki':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('masukan kata kunci kak')
				tels = body.slice(6)					
				anu = await fetchJson(`https://videfikri.com/api/wiki/?query=${tels}`, {method: 'get'})
				reply(anu.result.isi_konten)
				await limitAdd(sender)
			break
			case 'niatshalat':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					data = await fetchJson(`https://zahirr-web.herokuapp.com/api/muslim/niatshalat?apikey=zahirgans`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `${i.arabic}\n\n*Latin* : ${i.latin}\n*Bacaan* : ${i.name}\n*Terjemah* : ${i.terjemahan}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender)
			break
			case 'asmaulhusna':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					data = await fetchJson(`https://zahirr-web.herokuapp.com/api/muslim/asmaulhusna?apikey=zahirgans`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result.data) {
						teks += `${i.arabic}\n\n*Nomor* : ${i.index}\n*Latin* : ${i.latin}\n*Terjemah* : ${i.translation_id}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender)
			break
			case 'findnabi':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				        nabi = body.slice(10)
					data = await fetchJson(`https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=${nabi}`)
					nabii = `Nama : ${data.nabi.nama}\nUmur : ${data.nabi.umur}\n\n${data.nabi.kisah}`
					reply(nabii)
					await limitAdd(sender)
			break
			case 'quran':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					client.sendMessage(from, quran, text, {quoted: mek})
					await limitAdd(sender)
			break
                case 'neko':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(4)
				reply(ind.wait())
				anu = await fetchJson(`https://nekos.life/api/v2/img/neko`, {method: 'get'})
				buffer = await getBuffer(anu.url)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
				break
                case 'avatar':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(8)
				reply(ind.wait())
				anu = await fetchJson(`https://nekos.life/api/v2/img/avatar`, {method: 'get'})
				buffer = await getBuffer(anu.url)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
				break
                case 'kemonomimi':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(12)
				reply(ind.wait())
				anu = await fetchJson(`https://nekos.life/api/v2/img/kemonomimi`, {method: 'get'})
				buffer = await getBuffer(anu.url)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
				break
		case 'nekonime':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(9)
				reply(ind.wait())
                                anu = await fetchJson('https://akaneko-api.herokuapp.com/api/neko', {method: 'get'})
				buffer = await getBuffer(anu.url)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
				break
		case 'waifu':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					gatauda = body.slice(7)
					reply(ind.wait())
					data = await fetchJson('https://waifu.pics/api/sfw/waifu')
					hasil = await getBuffer(data.url)
					client.sendMessage(from, hasil, image, {quoted: mek})
					await limitAdd(sender)
		break
		case 'aesthetic':
				gatauda = body.slice(9)
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				anu = await fetchJson(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`, {method: 'get'})
				buffer = await getBuffer(anu.result.result)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih aestheticnya kak...'})
				await limitAdd(sender)
			break
			case 'hentai':
			case 'rdmhentai':
			case 'randomhentai':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				data = await fetchJson('https://nekos.life/api/v2/img/hentai')
				hasil = await getBuffer(data.url)
				client.sendMessage(from, hasil, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'hentai2':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				data = await fetchJson('https://akaneko-api.herokuapp.com/api/hentai')
				hasil = await getBuffer(data.url)
				client.sendMessage(from, hasil, image, {quoted: mek})
				await limitAdd(sender)
			break
			/*case 'moddroid':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=BotWeA`)
				hepi = data.result[0] 
				teks = `*Nama*: ${data.result[0].title}\n*publisher*: ${hepi.publisher}\n*mod info:* ${hepi.mod_info}\n*size*: ${hepi.size}\n*latest version*: ${hepi.latest_version}\n*genre*: ${hepi.genre}\n*link:* ${hepi.link}\n*download*: ${hepi.download}`
				buffer = await getBuffer(hepi.image)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
				await limitAdd(sender)
			break*/
			case 'happymod':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://api.zeks.xyz/api/happymod?apikey=apivinz&q=${body.slice(10)}`, {method: 'get'})
				teks = '=================\n'
				for (let i of data.result) {
					teks += `*Nama APK* : ${i.title}\n*Link* : ${i.url}\n*Rating* : ${i.rating}\n=================\n`
					}
				reply(teks.trim())
				await limitAdd(sender)
			break
			case 'tinyurl':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing) 
				data = await fetchJson(`https://api.zeks.xyz/api/urlshort?apikey=apivinz&url={args[0]}`)
				reply(data.result)
				await limitAdd(sender)
			break
                /*case 'nangis':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break*/
			case 'blowjob2':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isNsfw) return reply(ind.nsfwoff())
				reply(ind.wait())
				data = await fetchJson('https://nekos.life/api/v2/img/blowjob')
				hasil = await getBuffer(data.url)
				client.sendMessage(from, hasil, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'blowjob':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/bj', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'cium':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/kiss', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'peluk':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/hug', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'pussy':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/pussy', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'boobs':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/boobs', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'sodok':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/solog', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
				/*case 'husbu':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=BotWeA`)
						buffer = await getBuffer(res.image)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai husbumu'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					await limitAdd(sender)
					break*/
			/*case 'joox':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
				if (data.error) return reply(data.error)
				infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`
				buffer = await getBuffer(data.result.thumb)
				lagu = await getBuffer(data.result.mp3)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
				client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
				await limitAdd(sender)
			break*/
			case 'joox':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://pencarikode.xyz/download/joox?search=${body.slice(6)}&apikey=pais`, {method: 'get'})
				if (data.error) return reply(data.error)
				infomp3 = `*Lagu Ditemukan!!!*\nArtis : ${data.result.artist} - ${data.result.judul}\nAlbum : ${data.result.album}\nUkuruan : ${data.result.filesize}`
				buffer = await getBuffer(data.result.img_url)
				lagu = await getBuffer(data.result.mp3_url)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
				client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.judul}.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'play':   
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				play = body.slice(6)
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/yt-play?q=${play}`)
				if (anu.error) return reply(anu.error)
				infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${anu.title}\nSource : Error\nUkuran : ${anu.filesize}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
				buffer = await getBuffer(anu.thumb)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
				lagu = await getBuffer(anu.link)
				client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'play3':   
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				played = body.slice(7)
				anu = await fetchJson(`https://videfikri.com/api/ytplay/?query=${played}`)
				if (anu.error) return reply(anu.error)
				infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${anu.result.title}\nSource Id : https://youtu.be/${anu.result.id}\nUkuran : ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
				buffer = await getBuffer(anu.result.thumbnail)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
				lagu = await getBuffer(anu.result.url)
				client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
				await limitAdd(sender)
				break
			case 'play2':   
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				playvinz = body.slice(7)
				anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3/2?apikey=apivinz&q=${playvinz}`)
				if (anu.error) return reply(anu.error)
				infomp3vinz = `*Lagu Ditemukan!!!*\nJudul : ${anu.result.title}\nSource : ${anu.result.source}\nUkuran : ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
				buffer = await getBuffer(anu.result.thumb)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3vinz})
				laguvinz = await getBuffer(anu.result.link)
				client.sendMessage(from, laguvinz, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'ytmp3':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				if (args.length < 1) return reply('Urlnya mana kak?')
				if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
				anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?url=${args[0]}&apikey=apivinz`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				teks = `❏ *Title* : ${anu.result.title}\n❏ *Ukuran* : ${anu.result.size}\n\n❏ *Tunggu Bentar Ya Kak, Audionya Lagi Di Kirim...*`
				thumb = await getBuffer(anu.result.thumb)
				client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
				buffer = await getBuffer(anu.result.link)
				client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
				await limitAdd(sender)
			break
			case 'ytmp4':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				if (args.length < 1) return reply('Urlnya mana kak?')
				if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
				anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4/2?url=${args[0]}&apikey=apivinz`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				teks = `❏ *Title* : ${anu.result.title}\n❏ *Ukuran* : ${anu.result.size}\n\n❏ *Tunggu Bentar Ya Kak, Vidoenya Lagi Di Kirim...*`
				thumb = await getBuffer(anu.result.thumb)
				client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
				buffer = await getBuffer(anu.result.link)
				client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek})
				await limitAdd(sender)
			break
			case 'igmp4':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				reply(ind.wait())
				if (args.length < 1) return reply('Urlnya mana kak?')
				if(!isUrl(args[0]) && !args[0].includes('instagram')) return reply(ind.stikga())
				anu = await fetchJson(`https://videfikri.com/api/igdl/?url=${args[0]}`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				teeks = `❏ *Tunggu Bentar Ya Kak, Vidoenya Lagi Di Kirim...*`
				thumbs = await getBuffer(`https://i.ibb.co/4KSh6DX/maxresdefault.jpg`)
				client.sendMessage(from, thumbs, image, {quoted: mek, caption: teeks})
				buffer = await getBuffer(anu.result.video)
				client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: mek})
				await limitAdd(sender)
			break
			case 'tiktokdl':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson (`https://api.zeks.xyz/api/tiktok?url=${args[0]}&apikey=apivinz`, {method : 'get' })
				if (anu.error) return reply(anu.error)
				tekks = `❏ *Tunggu Bentar Ya Kak, Vidoenya Lagi Di Kirim...*`
				thuumbs = await getBuffer(`https://i.ibb.co/4KSh6DX/maxresdefault.jpg`)
				client.sendMessage(from, thuumbs, image, {quoted: mek, caption: tekks})
				buffer = await getBuffer(anu.no_watermark)
				client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: mek})
				await limitAdd(sender)
			brea
				//freerestapi 
			case 'githubstalk':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				hmms = await fetchJson(`https://pencarikode.xyz/stalk/github?q=${body.slice(13)}&apikey=pais`)
				buffer = await getBuffer(hmms.avatar_url)
				hasil = `Fullname : ${hmms.username}\nPengikut : ${hmms.followers}\nMengikuti : ${hmms.following}\nLink Blog : ${hmms.blog}\nUrl Github : ${hmms.url}\nbio : ${hmms.bio}`
				client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
				await limitAdd(sender)
			break
			case 'igstalk':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				hmm = await fetchJson(`https://api.zeks.xyz/api/igstalk?username=${body.slice(9)}&apikey=apivinz`)
				buffer = await getBuffer(hmm.profile_pic)
				hasil = `Fullname : ${hmm.fullname}\nPengikut : ${hmm.follower}\nMengikuti : ${hmm.following}\nPrivate : ${hmm.is_private}\nVerified : ${hmm.is_verified}\nbio : ${hmm.bio}`
				client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
				await limitAdd(sender)
			break
			case 'igstalk2':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://videfikri.com/api/igstalk/?username=${body.slice(9)}`)
				igstal = `*Username : ${data.result.username}*\n\nFullname : ${data.result.full_name}\nPengikut : ${data.result.followers}\nMengikuti : ${data.result.following}\nbio : ${data.result.bio}`
				reply(igstal)
				await limitAdd(sender)
			break
					//daftar 
			/*case 'daftar':
				if (isRegistered) return  reply(ind.rediregis())
				if (!q.includes('|')) return  reply(ind.wrongf())
				const namaUser = q.substring(0, q.indexOf('|') - 0)
				const umurUser = q.substring(q.lastIndexOf('|') + 1)
				const serialUser = createSerial(20)
				if(isNaN(umurUser)) return await reply('Umur harus berupa angka!!')
				if (namaUser.length >= 30) return reply(`why is your name so long it's a name or a train`)
				if (umurUser > 40) return reply(`your age is too  old maximum 40 years`)
				if (umurUser < 12) return reply(`your age is too young minimum 12 years`)
				try {
					ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				veri = sender
				if (isGroup) {
				addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
				await client.sendMessage(from, ppimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
				addATM(sender)
				addLevelingId(sender)
				console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
				} else {
				addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
            			await client.sendMessage(from, ppimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
				addATM(sender)
				addLevelingId(sender)
				console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
				}
			break*/
				//terhambar 
			case 'quotemaker':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				var gh = body.slice(12)
				var quote = gh.split("|")[0];
				var wm = gh.split("|")[1];
				const pref = `Usage: \n${prefix}quotemaker teks|watermark\n\nEx :\n${prefix}quotemaker ini contoh|Aine`
				if (args.length < 1) return reply(pref)
				reply(ind.wait())
				anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, {method: 'get'})
				buffer = await getBuffer(anu.result)
				client.sendMessage(from, buffer, image, {caption: 'Nih anjim', quoted: mek})
				await limitAdd(sender)
			break
				//fadli 
			case 'pictcewek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing)
				ty = ["ulzhang girl","cewek cantik","cewek hijab","cute girl","cewek rusia cantik","cewek jepang cantik","cecan indo"]
				nk = ty[Math.floor(Math.random() * ty.length)]
				try {
				data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {
				method: 'get'
				})
				reply(ind.wait())
				n = JSON.parse(JSON.stringify(data));
				nimek = n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, {
				quoted: mek, caption: `Tuh kak aine cariin cewe cantik`
				})
				await limitAdd(sender)
				} catch {
				reply(ind.wait())
				}
				break
			case 'pictcowok':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				denz.updatePresence(from, Presence.composing)
				uk = ["ulzhang boy","cowok keren","cowok ganteng","cogan","cowok korea"]
				nk = uk[Math.floor(Math.random() * uk.length)]
				try {
				data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {
				method: 'get'
				})
				reply(ind.wait())
				n = JSON.parse(JSON.stringify(data));
				nimek = n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				denz.sendMessage(from, pok, image, {
				quoted: mek, caption: `Tuh kak aine cariin cowo ganteng`
				})
				await limitAdd(sender)
				} catch {
				reply(ind.wait())
				}
				break
			case 'loli':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing)
				ty = ["loli","loli kawai","loli sagiri","anime loli","loli cat"]
				nk = ty[Math.floor(Math.random() * ty.length)]
				try {
				data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {
				method: 'get'
				})
				reply(ind.wait())
				n = JSON.parse(JSON.stringify(data));
				nimek = n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, {
				quoted: mek, caption: `Tuh kak aine cariin loli kawai`
				})
				await limitAdd(sender)
				} catch {
				reply(ind.wait())
				}
				break
			case 'anime':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing)
				ty = ["anime girl","anime kawai","anime girl profile","anime cute girl","anime cool girl","anime loli cute"]
				nk = ty[Math.floor(Math.random() * ty.length)]
				try {
				data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {
				method: 'get'
				})
				reply(ind.wait())
				n = JSON.parse(JSON.stringify(data));
				nimek = n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, {
				quoted: mek, caption: `Tuh kak aine cariin loli kawai`
				})
				await limitAdd(sender)
				} catch {
				reply(ind.wait())
				}
				break
			case 'pinterest':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing) 
				data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
				reply(ind.wait())
				n = JSON.parse(JSON.stringify(data));
				nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek, caption: `*𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓*`})
				await limitAdd(sender)
			break 
			case 'pokemon':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'anjing':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'kucing':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kucing`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'doraemon':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=doraemon`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'hamster':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic-hamsters`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'kelinci':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic-rabbit`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'mobil':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=cars`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'motor':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=motorcycle`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'motor':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=bicycle`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'bluesky':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic-blue-sky`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'flower':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic-flower`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'icecream':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic%20ice%20cream`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'pemandangan':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=aesthetic%20pemandangan%20alam`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'osakana':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=osakana`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'menherachan':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=menhera-chan`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'naruto':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=naruto%20uzumaki%20wallpaper%20hd`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'animegirl':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime-girl`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'animeboy':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime-boy`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'quotesid':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=quotes%20indonesia`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'quotesen':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=quotes`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'katakata':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=katakata`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'katamotivasi':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kata%20motivasi`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'katakehidupan':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=kata%20kata%20bijak%20kehidupan`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
			case 'islami':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=quotes%20islami`, {method: 'get'})
				reply(ind.wait())
				var n = JSON.parse(JSON.stringify(anu));
				var nimek =  n[Math.floor(Math.random() * n.length)];
				pok = await getBuffer(nimek)
				client.sendMessage(from, pok, image, { quoted: mek })
				await limitAdd(sender)
			break
				//jojo 
			case 'stickerhide':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				ranp = getRandom('.gif')
				rano = getRandom('.webp')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/screed?text=${args[0]}`,{method: 'get'})
				exec(`wget ${anu} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
				await limitAdd(sender)
			break
			case 'emoji':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${args[0]}&type=aple`, {method: 'get'})
				jes = await getBuffer(anu)
				client.sendMessage(from, jes, image,{quoted : mek, caption : 'DONE'})
				await limitAdd(sender)
			break
			case 'quotes':
				client.updatePresence(from, Presence.composing) 
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = fs.readFileSync('./lib/quotes.js');
				jsonData = JSON.parse(data);
				randIndex = Math.floor(Math.random() * jsonData.length);
				randKey = jsonData[randIndex];
            			randQuote = '_'+randKey.quotes+'_\n\n_'+randKey.author+'_'
				client.sendMessage(from, randQuote, text, {quoted: mek})
				await limitAdd(sender) 
			break
			case 'pantun':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(8)					
				anu = await fetchJson(`https://api.zeks.xyz/api/pantun?apikey=apivinz`, {method: 'get'})
				reply(anu.result.pantun)
				await limitAdd(sender)
			break
	case 'quoteskehidupan':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const quotes =['Jangan pernah mengabaikan apapun yang terjadi, suatu saat akan sadar dan menyesal, ingat tuhan akan selalu memberikan penyesalan terakhir ...','Aku percaya, suatu hari nanti, aku akan memiliki semua hal yang telah aku doa kan selama ini.','Balas dendam yang paling terbaik adalah mengubah dirimu menjadi yang lebih baik lagi.','Hidupku jauh dari kata mewah, kalau kalian lihat aku selalu senang, itu karena aku tau cara menikmati hidup.','Persahabatan bukan tentang orang yang baik didepanmu, tetapi tentang orang yang tetap baik di belakangmu.','Tidak semua bisa dimiliki. Jaga yang sudah termiliki. Tidak semua bisa diterima. Pertahankan yang sudah ada.','Mereka pikir hidupku enak, padahal aku hanya berusaha untuk tidak mengeluh.','Ibu, sebajingan apapun anakmu ini, Hatiku selalu ingin bisa Membahagiakanmu.','Tidak semua hari berjalan dengan baik tapi ada hal baik di setiap harinya.','Pikiran negatif tidak akan pernah memberi kamu kehidupan yang positif','Mereka pikir hidupku enak, padahal aku hanya berusaha untuk tidak mengeluh.','Saya percaya bahwa satu-satunya keberanian yang dibutuhkan oleh seseorang adalah keberanian untuk mengikuti impian Anda sendiri.','Arti hidup adalah menemukan hadiahmu. Tujuan hidup adalah untuk memberikannya.','Ada kalanya kita dicari ketika diperlukan, Dan dilupakan setelah dapat apa yang dia inginkan.','Aku suka tidur, Bukan karena aku pemalas Hanya saja mimpiku lebih indah dari kenyataan.','Jika kamu terlahir bukan dari keluarga kaya, Maka pastikanlah keluarga kaya berasal dari mu.','Saat kamu memberi orang lain, sesungguhnya pemberian itu adalah untukmu. Dan saat kamu mendoakan orang lain, sesungguhnya doa itu juga untukmu. Maka sibuklah membahagiakan orang lain, agar kemudian dunia akan sibuk membahagiakanmu.','Pernah salah pilih, Pernah salah jalan, Karena ego, Karena ceroboh, Tapi kalau bukan karena salah, Kita tidak akan pernah belajar.','Teruntuk hatiku semoga kamu sabar dan tabah bukan untuk hari ini, tapi untuk setiap hari.','Apapun yang kamu alami hari ini tetaplah terlihat baik-baik saja, are you oke?','Wajar kulitku hitam, Tanganku kasar, Penampilanku dekil, KARENA KEGIATANKU KERJA BUKAN MEMINTA.','Sibuklah mencintai hidupmu sampai kamu tidak punya waktu untuk membenci, menyesal, ataupun merasa takut.','AKU BAHAGIA KARENA BERSYUKUR, BUKAN BERSYUKUR KARENA BAHAGIA.','Hanya karena kamu bisa melakukan apa saja, bukan berarti kamu mampu melakukan segalanya.','Kegagalan adalah kesempatan untuk memulai lagi dengan cara yang lebih cerdas.','Dulu waktu masih kecil tidak sabar pengen jadi dewasa, tapi ketika udah besar, aku baru sadar bahwa jaman kecil lah yang paling bahagia.','Saya adalah saya, Saya bukan dia ataupun mereka Jika ingin bersama saya, Terimalah apa adanya.','Online ku sangatlah santai ada yang chat ya syukur, tidak ada yang chat ya tidur.','Kamu tidak begitu dalam mengenaliku, jadi tolong berhentilah sok tau tentang hidup ku.','Saya terlahir dari keluarga sederhana jadi maaf kalau penampilan saya apa adanya.','Dirimu sebenarnya adalah apa yang kamu lakukan di saat tiada orang yang melihatmu.','Ada dua pilihan hidup di pagi hari. Kembali tidur untuk melanjutkan mimpi, atau bangun tidur untuk mewujudkan mimpi.','Orang yang dibelakangku membicarakan diriku, keadaanku, keburukanku, mungkin ia membahayakan dalam duniaku tapi yang jelas ia bermanfaat untuk akhiratku, maka biarlah ia meneruskannya. *#Jangan lupa tersenyum untuk setiap harinya*','Lupakanlah masalahmu sejenak, dan berbahagialah kamu.','Mencintai memang tentang penerimaan. Tapi bukan untuk dibodohi.','Hidup adalah keseimbangan antara menggenggam dan melepaskan.','Jalanan yang sulit seringkali membawamu ke tujuan yang paling indah.','Kita tidak gagal. Kita hanya telah belajar dari 1000 cara yang salah.','Kalau kamu menginginkan sesuatu yang belum pernah kamu miliki, kamu harus melakukan sesuatu yang belum pernah kamu lakukan.','Jangan berhenti sebelum kamu bangga dengan dirimu sendiri.','Siapapun yang kamu cari.. Percayalah, dia juga sedang mencarimu.','Bahagia itu tujuan, kecewa itu jalan. Seseorang tidak akan sampai ke tujuan, tanpa melewati sebuah jalan.','Teruslah update status, setidaknya orang lain tau bahwa kamu masih hidup.','Bukan aku yang hebat. Tapi doa orang tua ku.','Kalau kamu sering disakiti orang itu artinya kamu orang baik. Ingat, cuma pohon berbuah yang dilempari batu.','Dalam hidup ini, Sadar itu penting loh, Jangan sabar mulu, CAPEK!','Kamu mempunyai banyak pilihan hidup untuk itu, Pilihlah hanya yang bisa benar-benar menjadikanmu lebih baik.','Aku kuat karena aku pernah lemah. Aku berani karena aku pernah merasa takut. Aku bijak karena aku pernah melakukan kesalahan.','Bukan berdoa untuk meminta hidup yang lebih mudah, Tapi berdoalah untuk bisa menjadi manusia yang lebih tangguh dalam menjalani hidup.','Selalu ada kisah yang kamu tidak tau di balik setiap orang. Selalu ada alasan mengapa mereka menjadi seperti itu. Pikiran hal ini sebelum kamu mencoba menghakimi orang lain.','Orang lain hanya melihat hasil akhir tanpa pernah tau bagaimana lelahnya berproses.','Kebahagiaan bukan milik mereka yang memiliki segalanya, Tetapi untuk mereka yang bisa menghargai apa yang mereka miliki.','Aku hanya ingin diperlakukan spesial lagi.','Terkadang, Hal yang menahan mu untuk bergerak maju hanyalah Pikiranmu sendiri.','Dua hal Menggambarkan dirimu : Kesabaranmu saat tak punya apa-apa Dan Sikapmu saat memiliki segalanya.','Kita hanya bersama bukan bersatu.','Saat kamu benar Semua orang lupa Saat kamu salah Semua orang ingat','Uang memang bukan segalanya tapi Tanpa uang kehidupan ini akan susah','Bila kamu Yakin , Tak perlu ada kata Mungkin','Jadilah kuat untuk melepaskan, Dan sabar untuk apa yang layak kamu dapatkan.','Pembenci itu sangat pemilih, Mereka hanya membenci orang yang hidupnya lebih baik  daripada hidup mereka.','Pasangan adalah cerminan diri kita. Maka teruslah perbaiki diri menjadi lebih baik setiap harinya, Maka pasangan terbaikpun akan diberikan tuhan.','Persahabatan adalah berbagi suka duka dan menua bersama.','Tersenyumlah ketika melihat masa lalu yang kelam, Karena engkau telah berhasil melewatinya.','Ketika banyak permasalahan yang menghampiri dirimu janganlah meminta untuk lekas dihilangkan. Tapi mintalah agar kamu bisa kuat untuk menyelesaikan.','Kehidupanmu adalah buah dari tindakan yang kamu lakukan. Tidak ada yang bisa disalahkan selain dirimu.','Kehidupan bukanlah masalah yang harus diselesaikan namun kenyataan yang harus diambil pengalamannya.','Semoga di tahun baru, Buku baru, Penulisan yang baru dengan isi yang lebih menarik untuk diimbas kembali di penghujung cerita nanti.','Masa lalu memang menyimpan banyak kenangan, Namun itu bukan alasan untuk tidak terus melangkah ke depan.','Santailah, Nikmati saja hidup, Tersenyumlah lebih banyak, Tertawalah lebih banyak, Dan janganlah memikirkan banyak hal.','Setiap perbuatan yang membahagiakan sesama adalah suatu sikap yang mencerminkan pribadi yang mulia.','Jarang yang sadar kalau kegagalan juga merupakan kesempatan emas untuk menuju kesuksesan.','Lebih baik bekerja keras dalam kediamnya kesunyian, Biarkan nanti sukses mu yang berbicara.','Belajar dari kesalahan masa lalu merupakan salah satu langkah awal untuk maju.']
					const quo = quotes[Math.floor(Math.random() * quotes.length)]
					crot = await getBuffer(`https://i.ibb.co/Bj8tD93/IMG-20210126-WA0018.jpg`)
					client.sendMessage(from, crot, image, { quoted: mek, caption: '*Quotes Kehidupan*\n\n'+ quo })
					await limitAdd(sender)
					break
		case 'quotesislami':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const islami =['Hal yang paling manis adalah ketika seseorang menyebutkan nama kamu di tahajjud mereka.','Ya Allah panggillah diriku dan orang tuaku ke baitullah dalam keadaan sehat walafiat.','Ya Allah semoga seseorang yang engkau jodohkan denganku adalah seseorang yang saat ini sedang aku perjuangkan.','Allah tidak pernah tidur. Semua pasti akan di balas kelak. Orang-orang jahat yang sekarang bisa tertawa karena banyak uang, berkuasa, tapi besok-besok mereka semua di balas seadil-adilnya.','Jangan putus asa, Allah tidak akan mengecewakan hambanya yang ingin memperbaiki diri.','Percayalah orang yang menasehatimu untuk sholat adalah dia yang paling mencintaimu.','Bukannya Allah tidak tahu sedihmu, Tapi Allah tahu kalau kamu itu kuat.','Bacalah Al-Quran, Ia akan menenangkan hatimu meskipun engkau tidak memahami artinya.','Saat kita sakit hati sama omongan orang, saat itu juga sebenarnya Allah ngajarin kita buat jaga omongan kita ke orang lain. Sederhana bukan?','Di dunia ini orang paling baik pun bisa dicela, dan bahkan orang paling jahat sekalipun bisa di bela.','Al-Quran adalah teman yang tidak akan mengecewakan kamu di dunia dan akhirat.','Cara Allah menjawab doa hambanya : Iyaa.. aku beri untukmu sekarang. Tunggu, aku ingin melihat dulu perjuanganmu. Tidak, aku punya yang lebih baik untukmu.','Dan Allah tidak akan mengadzab mereka selama mereka mau Memohon ampun kepada-Nya. [Al-Anfaal, 8:33]','Kesabaran itu ada dua macam : Sabar atas sesuatu yang tidak kamu ingin. Sabar menahan diri dari sesuatu yang kamu ingini. -Ali bin Abi Thalib','Ambillah kebenaran, jika kamu telah mendengarnya. Karena sungguh di atas kebenaran ada cahaya. (HR. Abu Daud)','Sholatlah agar hatimu tenang, Istighfarlah agar kecewamu hilang, Berdoalah agar bahagiamu segera datang.','Surga itu mahal.. Akan tetapi orang miskin tetap mampu membelinya, Karena harganya bukan pada Harta melainkan Taqwa.','Ya Allah... Perbaikilah lisanku, Perbaikilah hatiku, Perbaikilah akhlakku, Perbaikilah hidupku, Aamiin..','Semoga hari ini Allah memudahkan setiap urusan kita, melapangkan hati kita serta meringankan langkah kita, dalam kebaikan kita Aamiin.','Peganglah aku, bacalah aku setiap hari, karena aku akan menjadi penerang didalam kuburmu nanti. #Al-Quran','Kematian..Kamu terlalu banyak bercanda. Hingga sampai kamu lupa, kematian mungkin tidak menunggumu selesai tertawa.','Jangan khawatirkan rizkimu, karena Allah telah menjaminnya untukmu, namun khawatirkanlah amalanmu, karena Allah tidak menjamin surga-Nya untukmu..','Wahai orang-orang yang beriman! Ingatlah kepada Allah, Dengan mengingat (nama-Nya) sebanyak-banyaknya dan bertasbihlah kepada-nya pada waktu pagi dan petang.','Aku sangat ingin menjadi pemburu surga. Namun aku lupa bahwa aku juga buronan neraka.','Karena aku percaya apapun yang menjadi milikku akan tetap menjadi milikku. Sejauh apapun dia (mencoba) pergi. Sejauh apapun usaha orang lain ingin merebutnya dariku. Aku hanya perlu percaya pada Allah bahwa yang menjadi milikku tidak akan pernah menjadi milik orang lain.','Andai hidayah itu seperti buah yang bisa kubeli, maka akan kubeli berkeranjang-keranjang untuk aku bagikan kepada orang-orang yang aku cintai.','Bila kamu tidak melihatku di syurga. Tolong tanya kepada Allah dimana aku, Tolonglah aku ketika itu..','Hanya Allah yang mengerti bagaimana sulitnya menahan sabar tanpa harus bercerita panjang lebar.','Letakkan hpmu lalu ambil air wudhu, shalatlah kamu, Allah menunggu curhatan darimu.','Maafin aku Ya Allah Gara gara aku mencintai dia tapi tidak pasti, sampai aku lupa mencintai mu juga.','Akan ada saatnya setelah salam dari sholatku, tanganmu yang pertama kali kusentuh.','Mungkin maksud Tuhan mempertemukan kamu dengannya adalah, sekedar mengingatkan bahwa tidak semua yang kamu inginkan bisa kamu dapatkan.','Percayalah Seorang wanita yang mencintai Allah. Allah akan berikan lelaki terbaik untuk menjaganya.','Berterimakasihlah kepada tuhan, Yang memberimu hidup dan kehidupan.','Mungkin kamu hanya harus sedikit peka untuk menyadari petunjuk dari Tuhan atas doa-doamu.']
					const isl = islami[Math.floor(Math.random() * islami.length)]
					islam = await getBuffer(`https://i.ibb.co/dPnjvD3/IMG-20210127-WA0018.jpg`)
					client.sendMessage(from, islam, image, { quoted: mek, caption: '*Quotes Islami*\n\n'+ isl })
					await limitAdd(sender)
					break	
		case 'quotesnasehat':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const nasehat =['Jangan pernah mengabaikan apapun yang terjadi, suatu saat akan sadar dan menyesal, ingat tuhan akan selalu memberikan penyesalan terakhir ...','Ingat iya.. Perilaku mu bisa mengubah perasaan seseorang.','Setia itu bukan yang selalu ada, namun saat tak bersama dia tahu hatinya milik siapa.','Kamu perlu belajar satu hal : "Menghargai seriusnya seseorang."','Jangan cari yang sempurna, Sempurnakan saja yang ada.','Ketika seseorang menghina kamu, itu adalah sebuah pujian bahwa selama ini mereka menghabiskan banyak waktu untuk memikirkan kamu, bahkan ketika kamu tidak memikirkan mereka.','Yang terbaik tidak akan hilang. Jika dia hilang maka dia bukanlah yang terbaik.','Percayalah. Suatu hari nanti pasti akan ada seseorang yang bangga memilikimu.','Tidak ada karya yang pernah dibuat oleh seorang seniman yang malas.','Jika seseorang memberimu perhatian jangan pernah mengabaikannya karena suatu saat perhatian sekecil itu kamu rindukan saat kamu kesepian.','Bersyukurlah.. Untuk segala apapun yang engkau miliki saat ini, sebab nikmat itu akan bertambah ketika kamu dapat mensyukuri apa yang telah diberi saat ini. #Buat diri ini jangan banyak mengeluh yah.','Ada perbedaan antara menyerah dan tau kapan kamu merasa cukup dalam berusaha.','Jangan sampai kesenanganmu menyusahkan orang lain. Jangan pula kesusahanmu menyenangkan orang lain.','Semakin banyak kamu memberi, semakin banyak pula yang akan kembali padamu.','Jangan pernah bandingkan akhir kesuksesan orang lain dengan pertengahan prosesmu.','Lakukan apa yang kamu bisa, dengan apa kamu miliki, dimanapun kamu berada.','Hidup memang bukan balapan, tetapi kamu memang perlu untuk terus bergerak maju.','NIKMATI HIDUPMU, LUPAKAN UMURMU.','Sebaik-baiknya permintaan maaf adalah membaiknya tingkah laku.','Belajarlah memahami bahwa tidak semua keinginan bisa terpenuhi, barangkali itu adalah obat yang terbaik untuk mencegah kecewa dan sakit hati.','Kamu akan menemukan yang terbaik, ketika kamu sudah berhenti membanding-bandingkan.','Jangan menilai orang dari masa lalunya karena kita semua sudah tidak hidup disana. Semua orang bisa berubah, biarkan mereka membuktikannya.','Jika dia tidak merasakan kehadiranmu, buat dia merasakan kepergianmu.','Orang pintar mampu memecahkan masalah. Orang bijak mampu menghindarinya.','Bersikap tidak lagi peduli lebih baik dari pada balas dendam.','Tegas akan diri sendiri, buang pikiran negatif dan lakukan yang baik. Kegelisahan hanya milik mereka yang putus asa.','Jangan pikirkan kegagalan kemarin, hari ini sudah lain, sukses pasti diraih selama semangat masih menyengat.','Memaafkanmu bukan berarti memberimu kesempatan sekali lagi.','Berubah menjadi lebih baik adalah pilihan. Tapi, merasa paling baik adalah kesalahan.','Jangan pernah bandingkan dirimu dengan orang lain, tapi bandingkanlah dengan dirimu yang lalu, apakah hari ini sudah lebih baik?','Ketahuilah orang yang paling sering memberi nasihat kepadamu, itulah orang yang paling mencintai kamu.','Jangan pernah berhenti belajar, karena hidup tidak pernah berhenti mengajarkan.','Salah satu tanda dirimu tidak berakhlak adalah main HP ketika ada orang yang berbicara.','Raihlah kesuksesan yang tidak seseorangpun berfikir kamu bisa meraihnya. Buktikan pada mereka kalau kamu bisa!','Kesalahan adalah bukti nyata kalau kamu pernah mencoba. Jangan takut salah. Takutlah untuk melakukan kesalahan-kesalahan yang sama dua kalinya.','Cepat atau lambat bukan masalah. Selama kamu tetap bergerak maju, tidak ada akhirnya kamu akan tetap sampai tidak ada tujuan.','Jika kamu tidak bisa membahagiakan orang lain, Setidaknya janganlah kamu tambah dukanya.','Teruslah berusaha sampai temanmu berkata kepadamu "Sombong iya sekarang."','Ketika kamu melakukan sebuah kesalahan, Akuilah dan jangan ragu untuk meminta maaf. Tidak pernah ada satupun orang dalam sejarah yang mati tersedak karena menelan gengsinya sendiri.','Syukuri yang menyayangimu, Maafkan yang menyakitimu.','Tunjukkan keburukanmu, lalu lihat siapa yang bertahan.','Kamu boleh lelah, tetapi tidak boleh menyerah untuk selamanya.','Jangan pernah lupa bilang "Terima Kasih." Jangan pernah gengsi bilang "Maaf." Jangan pernah jadi terlalu sombong untuk bilang "Tolong."','Masa lalu tidak bisa berubah, diubah, dilupakan, ataupun di hapus. Masa lalu hanya bisa di terima','Kita ini.. sangat pintar menghakimi, Namun bodoh dalam memperbaiki diri.','Tidak peduli seberapa baiknya kamu, Kebaikan tidak akan berarti apa-apa jika kamu memberikan kepada orang yang salah.','Orang sabar selalu menang, Orang tamak selalu rugi, Orang marah selalu kalah, Orang baik selalu diuji.','Carilah tempat dimana kamu bisa dihargai, Bukan dibutuhkan. Karena banyak orang mencarimu hanya saat butuh saja, Hingga lupa bagaimana cara menghargaimu.','Melupakan orang yang melukaimu adalah hadiahmu untuk mereka. Memaafkan orang yang melukaimu adalah hadiahmu untuk dirimu sendiri.','Maafkan orang yang menyakitimu... Bukan karena mereka pantas di maafkan, Tapi karena kamu harus berbahagia.','Tetaplah kuat, Tetaplah positif, Buatlah mereka bertanya-tanya bagaimana kamu masih tetap bisa tersenyum.','Jangan meninggalkan yang pasti demi yang mungkin. Sebab semua kemungkinan, belum tentu menjadi kepastian.','Seseorang pernah berkata padaku, Merelakan bukan berarti menyerah, Tapi tidak bisa dipaksakan.','Ikuti alurnya, Nikmati prosesnya, Tuhan tau kapan kita harus bahagia.','Usia hanyalah angka, Hanya mereka yang terus berusaha yang berhasil.','Jangan pernah meremehkan siapapun! Karena sukses adalah balas dendam Terbaik.','Pria sejati.. Harus menyelesaikan apa yang sudah dimulai.','Jika kau ingin terbang, Kau harus melepaskan hal-hal yang membuatmu berat.','Siapapun yang meremehkan mu hari ini, Suatu saat harus kamu lewati.','Jangan Mencintai terlalu mudah, Jangan Percaya terlalu cepat, Jangan Berhenti terlalu dini, Jangan Berharap terlalu tinggi, Jangan Bicara terlalu banyak.','Jadilah orang baik tapi jangan biarkan orang lain mengambil keuntungan dari mu. Ketahuilah kapan kamu harus bilang tidak.','Sahabat sejati adalah mereka tau semua kelemahan mu, Tapi tidak menggunakan nya untuk menjatuhkan mu.','Ada tiga hal yang harus dimiliki dalam hidup yaitu : Perubahan, Pilihan dan Prinsip.','Orang bodoh mengira dirinya bijak. orang bijak tau dirinya bodoh.','Jatuh cintalah seperlunya.. Kemudian patah hatilah secukupnya. Karena semua ada porsinya, Karena semua ada masanya.','Kita tidak pernah tau jalan hidup seseorang.. Maka ada baiknya jika kita tidak menghakiminya atas keputusan dalam hidupnya.','Jangan pernah menyesal mengenal seseorang dalam hidupmu, Orang baik akan memberi mu Kebahagiaan, Orang jahat akan memberi mu Pengalaman, Bahkan seburuk-buruk manusia akan memberi mu Pelajaran.','Jangan menilai kedewasaan dari usia seseorang, Karena itu bukan jaminan.']
					const nsh = nasehat[Math.floor(Math.random() * nasehat.length)]
					nase = await getBuffer(`https://i.ibb.co/bspYPtC/IMG-20210125-WA0018.jpg`)
					client.sendMessage(from, nase, image, { quoted: mek, caption: '*Quotes Nasehat*\n\n'+ nsh })
					await limitAdd(sender)
					break	
		case 'quotescinta':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const cinta =['Disaat bosan dan jarang ketemu Aku harap kamu tidak mencari kenyamanan dengan orang lain.','Saya tidak mencari yang sempurna, tapi saya mencari yang menganggap saya dan, tidak malu memiliki saya.','Maaf aku mencintaimu hanya bermodalkan setia bukan dengan harta.','Berjanjilah tidak akan pergi, walaupun ada seseorang yang lebih sempurna dariku.','Boleh aku minta satu hal? Tolong jangan jatuh cinta pada orang lain selain aku.','Ketika ibuku mengenalmu, berarti aku sungguh serius berhubungan denganmu.','Aku tidak ingin kehilanganmu hari ini, esok, ataupun selamanya.','Aku memilihmu karena aku nyaman, dan itu tidak aku dapatkan dari orang lain.','Cinta terbaik adalah saat kamu mencintai seseorang yang membuat akhlaqmu makin indah, dan hatimu makin bijak.','Laki laki hebat dia mempersiapkan lamaran bukan mengajak pacaran.','Sebaik-baiknya cinta adalah cinta yang di halalkan.','Duduklah disampingku, akan diceritakan betapa tulusnya aku mencintaimu.','Berkomitmen denganmu adalah adaptasi yang tidak cukup sehari. Setiap harinya petualangan, Kadang menyebalkan seringkali menyenangkan beberapa kali ingin mundur tapi sepertinya hidup takan baik baik saja tanpamu.','Bersabarlah Cinta sejati tau kemana dia akan pulang.','Bahagialah kamu yang mempunyai dia yang tidak hanya pintar merebut hati, namun juga pintar menjaga hati.','Ketika cowok sudah masuk ke logikanya cewek. Ketika cewek sudah masuk ke perasaannya cowok. Masing-masing tidak akan bisa ke mana-mana.','Dia yang selalu memuja kelebihanmu pada akhirnya akan kalah dengan dia yang masih tetap di sisimu setelah tau kekuranganmu.','Kamu bisa berjalan dengan siapa saja, Tapi tolong, Tolong jaga hati ini, yang sudah mencintai mu.','Kalau kangen tidak usah bilang-bilang ya.. Takutnya entar aku luluh terus lupa alasan membenci kamu. Serius..','Kadang kita harus merelakan yang kita cintai, Mengikhlaskan yang kita ingini. Bukan karena Allah tidak sayang, Tapi itulah tanda sayangnya dia, agar bisa belajar bahwa kita hanya dititipi bukan memiliki.','Jika masih kalah dari jarak & sinyal berarti cintamu tak cukup handal.','Aku cemburu karena aku takut seseorang bisa membahagiakanmu lebih daripada aku.','Jatuh cinta sih boleh pake perasaan, Tapi ngerawatnya pake penghasilan.','Seseorang yang memang ditakdirkan untuk mu akan selalu ada di sisimu\nTAK PERLU KAU KEJAR\nTAK PERLU KAU MOHON\nTAK PERLU KAU PAKSA','Semoga yang saat ini bersamaku, Tidak menyimpan rasa pada orang lain.','Kamu tidak bisa memaksa dia untuk mencintai mu, Tapi kamu bisa memaksa dirimu untuk berhenti mencintainya.','Cinta itu tak akan pernah mati. Tapi bisa berpindah ke lain hati,Kepada dia yang lebih menghargai.','Tolong, Jangan hanya diam ketika aku sedang memperjuangkanmu..','Beberapa orang ditakdirkan untuk saling jatuh cinta, Tapi tidak ditakdirkan untuk bersama.','Mari kita saling melengkapi.Aku akan menjadi kelebihan di setiap kekuranganmu.Dan kau akan menjadi kelebihan di setiap kekurangan ku.','Mencintaimu adalah bahagia dan sedih. Bahagia karena memiliki mu dalam kalbu, Sedih karena kita sering berpisah.','Mimpiku sangat sederhana, Yaitu mencintai mu dan bisa berada dalam satu ikatan halal bersama mu.']
					const cin = cinta[Math.floor(Math.random() * cinta.length)]
					cta = await getBuffer(`https://i.ibb.co/vL5x6F7/IMG-20210126-WA0018.jpg`)
					client.sendMessage(from, cta, image, { quoted: mek, caption: '*Quotes Cinta*\n\n'+ cin })
					await limitAdd(sender)
					break
		case 'quotesmotivasi':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const motiv =['Nilai sebuah tindakan terletak dalam usaha menyelesaikan sampai tuntas','Kebaikan adalah seorang yang matanya penuh perhatian, serta tangannya yang penuh manfaat','Hiduplah seperti kamu akan mati besok, dan berbahagialah seperti kamu akan hidup selamanya','Kita tidak usah saling menyalahkan, agar dimasa depan tak ada yang menuntut akan kesalahan','Ketika semua hal tidak sejalan dengan anda, ingatlah bahwa sebuah pesawat terbang melawan angin, bukan dengan mengikuti angin','Belajarlah menikmati apa yang kamu miliki, itu akan membuat hidupmu lebih bernilai','Selalu ada kegelapan yang tergelap sebelum terbitnya fajar','Sahabat itu seperti bintang, tak selalu Nampak tetapi selalu ada dihati','Sibuk bukanlah jaminan karir karena hasil jauh lebih didengar orang','semua kemajuan tidak akan ada tanpa kesalahan, kesalahan adalah bagian dari kemajuan selama diakui dan diperbaiki','Sukses meninggalkan jejak, gagal meninggalkan pelajaran, diam meninggalkan penyesalan','Keraguan bersahabat dekat dengan kegagalan','uang tidak merusak seseorang, keserakahan lah yang merusak manusia','Kepercayaan tidak bisa dibeli, tapi kepercayaan bisa dipelihara','Impian, target, kemauan dan tujuan semuanya sia-sia tanpa tindakan','usia bisa berbohong tapi kedewasaan tidak','Ada yang lebih berharga dari uang dan emas yaitu waktu','Tidak ada yang gagal mereka hanya berhenti terlalu cepat','Terasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Seseorang tidak bisa sukses seringkali karena kurangnya keberanian untuk mencobaterasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Bicaralah secukupnya, lakukanlah semampunya. Jangan melakukan sebaliknya','Ada saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','jangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','Kadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','atasan hanya memberikan tugas berat pada karyawan terbaik, Allah hanya memberikan ujian pada pada manusia terbaikKadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','berusaha dan gagal Ternyata jauh lebih melegakan daripada pasrah melihat ke kanan dengan tangan terlipat','lewat kesulitan lah manusia belajar, lewatnya kenyamanan lah manusia Terlena','Saat kita merasa hebat kita baru saja kehilangan separuh pangkat kita karena lengah untuk terus belajar','hidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang hebat membicarakan ide, orang menengah membicarakan pengalaman, orang lemah membicarakan orang lainOrang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Anda tidak akan mengubah kehidupan sampai anda mengubah Apa yang anda lakukan setiap hari','bertahan saja tidak cukup anda perlu bereaksi terhadap tekanan dan merubah keadaan','masa depan kita tergantung pada apa yang kita lakukan pada saat ini. Maka jangan sia-siakan waktumu sekarang','Nilai manusia ditentukan bukan dari apa yang diperoleh melainkan apa yang telah diberikan','Malas adalah kemenangan saat ini dan kekalahan di masa nanti','sebuah masalah merupakan kesempatan bagi anda untuk mengeluarkan kemampuan terbaik anda','Kematian tidak dapat mengubur perbuatan baik seseorang','Asal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Jika ada hari buruk maka pasti akan hari ada hari baik tugas kita adalah terus bergerak majuAsal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Mengeluh adalah cara paling buruk dalam menyelesaikan masalah','Tetap Bertahan dan setia pada tujuan saat menghadapi Hambatan adalah kunci kesuksesan','Tidak perlu keahlian khusus untuk mencari musuh, tapi perlu kesetiaan untuk mempertahankan teman','Orang tua bukan hanya punya kekuatan untuk menatap juga untuk mengalah','Keuletan adalah tanda jadi kesuksesan','cepat atau lambat mereka yang menang adalah mereka yang berfikir dan yakin bahwa mereka bisa','Jaga terus Api Harapan Anda seperti menjaga hidup anda sendiri','Saat semua jalan tertutup. Buatlah jalan dan berserahlah kepada Allah','lari dari masalah bukanlah penyelesaian masalah, hadapi dan Belajarlah dari masalah itu','Rezeki itu ditangan Allah yang kita lakukan hanya berusaha semaksimal mungkin dan menyerahkan hasilnya kepada yang kuasa','Sukses dimulai dengan melakukan apa yang harus dilakukan','rasa syukur membuat kita tidak pernah merasa kekurangan','goal hanya sekedar goal kalau kita tidak mempunyai alasan yang kuat Mengapa kita harus mencapainya','Apapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','orang yang paling Bahagia bukanlah orang yang punya hal-hal terbaik tapi orang yang bisa menjadikan hal-hal yang ia punya menjadi yang terbaikApapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','Respon kita terhadap masalah menentukan kualitas berita fokus pada solusi','Semua yang terlalu sedikit dan terlalu banyak tidak akan membawa kebaikan','Tidak semua usaha kita dibayar oleh manusia, tapi Allah akan membayarnya kelak','Tidak ada harga untuk waktu, tetapi waktu sangat berharga','Sukses seringkali datang pada mereka yang berani bertindak dan jarang menghampiri pada mereka yang dikalahkan ketakutan','Katakan bisa pasti bisa dengan penuh keyakinan otak kita akan segera mencari solusi','Orang yang tidak belajar dari kegagalan adalah orang yang gagal sesungguhnya','Segala sesuatu masalah yang menimpa Anda tidak akan pernah melatih kekuatan anda untuk menyelesaikannya','Saat orang lain melakukan impianmu itu berarti mereka belum mampu melihat sejauh anda melihat','Allah tidak pernah terlambat ia akan menunjukkan kuasanya, pada detik terakhir sekalipun','Bukan banyaknya panah yang menentukan kemenangan tapi tajam panah dan tujuannya yang menentukan','Mengeluh itu sisi lain dari pemborosan, pemborosan waktu dan energy','Pikiran negatif sangat berkuasa bila diberi kesempatan, jadi jangan memberinya kesempatan','Cinta akan membuat kita menjadi orang terkaya di dunia, oleh karena itu mulailah mencintai','Cemas yang berlebihan tidak akan mengubah apapun kecuali merusak diri sendiri','Hidup ini sederhana terkadang pikiran manusia yang membuatnya rumit','Siapa yang bisa menerima kelemahannya sesungguhnya baru saja menambah satu kelebihan pada dirinya','Ada saatnya dimana kekalahan rasa manis yaitu Saat anda sudah melakukan yang terbaik','Menabung itu hanya untuk mempertahankan kekayaan, untuk meningkatkannya berinvestasilah','Jika selamanya anda bermain aman, selamanya juga Anda di tempat yang sama','Lari dari masalah akan membuat masalah menjadi lebih besar, menghadapinya akan membuat anda menjadi lebih besar','Yang menyedihkan bukanlah bidikan yang meleset tapi bidikan tanpa target','Hati yang sedang panas menumpulkan logika dinginkan terlebih dahulu sebelum mengambil keputusan','bila ingin hasil yang besar jangan kerjakan hal yang mudah saja','Jangan biarkan impianmu dijajah oleh pendapat orang lain','Mulailah dengan yang kecil, Kerjakanlah dengan cara yang besar adalah dengan cara yang benar','Pengaruh perkataan orang kepada anda 100% adalah atas izin anda sendiri','Bekerjalah dengan ikhlas karena bekerja tanpa paksaan akan memberi hasil maksimal','Suka belajar, suka jualan, hidup hemat, beli aset suka, sedekah adalah 5 resep Makmur','Lebih baik menjadi raja tikus daripada ekor naga','Kerja keras dan kerja cerdas dapat memastikan keberhasilan dan sedekah dapat memudahkannya','Sakit dalam perjuangan itu hanya berlangsung sementara, namun jika anda menyerah rasa sakit itu akan terasa selamanya','Kegagalan terbesar adalah ketika tidak berani mencoba','Langkah pertama yang diperlukan untuk mendapatkan hal yang anda inginkan adalah memutuskan apa yang anda inginkan','Jangan takut menghadapi masa depan, hadapi dan perjuangkanlah','Dahulukan Allah dalam setiap langkah hidupmu maka semuanya akan ditambahkan kepadamu','Kesulitan adalah hujan terbaik untuk menunjukkan kualitas diri yang sebenarnya','Kesalahan dan kegagalan adalah guru terbaik jika kita mau jujur mengakui dan belajar darinya','Diam belum tentu menyelesaikan masalah tapi setidaknya tidak membesarkan masalah','Pemenang sejati selalu memberikan 100% upayanya, bahkan ketika tidak seorang pun melihatnya','Memaafkan orang lain bagai Menyiram air Bara dendam di hati baik untuk kesehatan kita','Jenius adalah 1 inspirasi dan 99 keringat tidak ada yang dapat menggantikan kerja keras','Disiplin memang tidak mudah tapi tanpa kedisiplinan hidup anda akan jauh lebih sulit','Orang yang berhenti belajar akan menjadi pemilik masa lalu, orang yang terus belajar akan menjadi pemilik masa depan','Hujan tidak hanya datang sendirian Ia datang bersama kesejukan, hal buruk tidak datang sendirian ia datang bersama pembelajaran','Menang atau kalah lakukanlah dengan jujur','Lihatlah tantangan sebagai ujian dan lihatlah masalah Sebagai teguran','Lihat ke atas agar terinspirasi lihat ke bawah agar bersyukur','Untuk meraih apa yang benar-benar anda inginkan fokus saja tidak cukup. Anda harus memiliki rasa lapar untuk meraihnya','90% dari kegagalan berasal dari orang-orang yang memiliki kebiasaan membuat alasan-alasan','Allah tidak membenci orang malas, tapi Allah mengizinkan orang rajin mengambil rezeki orang malas','Keajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Orang optimis dapat melihat peluang dalam masalah, orang pesimis akan melihat masalah dalam peluangKeajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Kualitas pikiran anda menentukan kualitas kehidupan anda','Bersyukur adalah cara ampuh untuk meraih energi yang dahsyat, Sudahkah anda bersyukur hari ini','Jangan mengharapkan sesuatu yang luar biasa jika anda hanya mau melakukan hal yang biasa saja','Kebahagiaan dimulai dengan ketulusan','1000 perkataan dan pengetahuan tidak berarti tanpa adanya satu tindakan yang nyata','Tangkap peluang, kerjakan, selesaikan','Ketika situasi di sekolah Anda tidak menyenangkan. Di saat itulah sebenarnya karakter anda sedang dibentuk','Seorang pemberani bukan orang yang tidak mempunyai rasa takut. Tapi orang yang mampu berjalan diatas rasa takutnya','dalam takut yang tampak adalah hambatan, dalam yakin yang tampak adalah kesempatan','Tidak ada kata gagal yang ada hanya sukses atau perlu belajar lagi sampai berhasil','Menjadi tua itu pasti menjadi dewasa itu pilihan','Kehidupan yang besar dimulai dari mimpi yang besar','Tragedi dalam kehidupan ini bukanlah yang berakhir terlalu cepat, tetapi kita menunggu terlalu lama untuk memulainya','Takut akan kegagalan seharusnya tidak menjadi alasan untuk tidak mencoba sesuatu','Hari ini adalah hari pertama dalam hidup anda. Buatlah hari ini menjadi hari yang terbaik sepanjang hidup anda dan semoga hari esok matahari bersinar dengan terang','Saya berpikir bahwa ada suatu hal yang lebih penting daripada sekedar percaya, tindakan Dunia ini penuh dengan pemimpi ,tidaklah banyak orang yang berani maju ke depan dan Mulai mengambil langkah pasti untuk mewujudkan visi mereka','Anda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Allah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Pergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Menangis dapat melepaskan tambahan hormon stress, itulah mengapa kita sehabis menangis merasa lebih baikPergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Ketika cinta itu dipertahankan kamu akan tau siapa yang lebih menghargai tentang sebuah hubungan','Dalam hidup ini banyak orang tahu apa yang harus dilakukan, tetapi hanya sedikit yang melakukan apa yang ia ketahui. Mengetahui tidaklah cukup, Anda harus mengambil tindakan','Berilah perhatian lebih ke orang yang kamu sayangi, itu yang mereka butuhkan','Satu ons tindakan sama berharganya dengan satu ton teori','Kita mungkin terpisah sejak lama ketika tak mampu belajar untuk lebih dewasa','Sayangilah dia walau tidak sesempurna seperti yang kau inginkan','Kecantikan akan mengundang perhatian sikap santun memikat Kalbu','Mengetahui tidaklah cukup kita harus melakukannya, keinginan tak cukup hanya dengan berangan kita harus melakukannya','Kesalahan adalah bukti bahwa kamu sedang mencoba','Betapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lebih baik sendiri daripada bersama dengan orang yang salahBetapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lakukan sesuatu hari ini yang akan membuat dirimu berterima kasih di hari-hari mendatang','Waktu yang memutuskan Dengan siapa kamu akan berjumpa','Hati yang memutuskan siapa yang kamu inginkan dalam hidup ini','Dengan sikap yang akan menentukan siapa yang akan bertahan dalam hidupmu','Menjadi dewasa dan bijak diawali dengan menjadi muda dan bodoh','Lakukanlah apa yang paling kamu takutkan dalam hidupmu','Bekerjalah seolah kamu tak butuh uang, Cintailah seolah Kamu takkan Tersakiti dan menarilah seakan tak ada yang melihatmu','Jika hari ini sudah sempurna maka Apalah arti hari esok','Bintang pun tak kan bersinar tanpa kegelapan','Suatu saat aku akan menjadi tempat yang akan selalu kau rindu','Guru terbaik kamu adalah kesalahan terakhir yang kamu lakukan','Diam adalah respon terbaik untuk orang bodoh','Jangan pernah membuat keputusan yang permanen untuk perasaan yang sementara','Jika Allah yang menjadi alasan anda untuk hidup maka takkan pernah ada alasan untuk menyerah','Kegagalan ada bukan untuk ditakuti tetapi untuk dipelajari','Anda saat ini adalah hasil dari pengalaman anda','Keberuntungan adalah saat kesempatan datang, anda telah matang dengan segala persiapan','Jangan Menunggu hari yang terbaik untuk melangkah karena setiap hari sangatlah berharga','Keputusan yang baik diperoleh dari pengalaman, dan pengalaman didapat dari keputusan yang buruk','Setiap waktu yang anda lewati dengan sia-sia hanya menjauhkan anda dan semakin jauh dari kata sukses','Realitas kehidupan Anda adalah deskripsi dari jiwa dan pikiran anda','Berani mengambil keputusan maka anda telah melangkah 10 kali lebih cepat untuk sukses','Allah masih mencintai anda jika masih banyak cobaan dan tantangan hidup yang datang menghampiri anda. Allah percaya bahwa anda mampu melaluinya, maka jagalah kepercayaan itu','Ketika orang mengatakan anda sudah berubah sebenarnya itu hanya karena anda berhenti melakukan apa yang mereka ingin anda lakukan','Jangan menukar apa yang sangat anda inginkan untuk apa yang Anda ingin untuk saat ini','Orang-orang yang mengikuti keramaian biasanya tersesat di dalamnya','Orang tua saya bekerja terlalu keras untuk saya bukan supaya saya tidak hanya menjadi orang biasa tetapi menjadi orang luar biasa','Anda menghalangi impian anda ketika anda mengizinkan ketakutan Anda tumbuh lebih besar dari keyakinan anda','Sang juara percaya kepada dirinya sendiri bahkan ketika orang lain tidak percaya','Hanya mereka yang berani mengambil resiko yang jauh pasti dapat menemukan Seberapa jauh seseorang dapat pergi','Tunjukkan teman Anda, saya akan menunjukkan masa depan Anda','Beberapa orang ingin sesuatu terjadi, beberapa orang berharap itu akan terjadi, yang lain mewujudkannya jadi kenyataan','Jika anda menghabiskan waktu untuk mencoba menjadi baik dalam segala hal, Anda tidak akan pernah menjadi hebat dalam apapun','Sebuah perjalanan ribuan mil dimulai dari langkah kecil','Apa yang akan Anda kerjakan, Ketika anda tahu anda tidak mungkin gagal','Ketika kita memiliki satu sama lain, kita Memiliki segalanya','Kebesaran sebenarnya dapat ditemukan dalam hal hal kecil yang terkadang kita lewatkan','Bekerja keraslah, Bermimpilah lebih besar dan jadilah yang terbaik','Apa yang kita pikirkan menentukan apa yang akan terjadi pada kita. Jadi jika kita ingin mengubah hidup kita, kita perlu sedikit mengubah pikiran kita.','Seseorang yang berani membuang satu jam waktunya tidak mengetahui nilai dari kehidupan.','Saya memiliki filosofi yang sederhana: isi apa yang kosong, kosongkan apa yang terlalu penuh.','Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Anda di sini hanya untuk persinggahan yang singkat. Jangan terburu, jangan khawatir. Yakinlah bahwa Anda menghirup wangi bunga sepanjang perjalanan.Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Hidup adalah serangkaian perubahan yang alami dan spontan. Jangan tolak mereka karena itu hanya membuat penyesalan dan duka. Biarkan realita menjadi realita. Biarkan sesuatu mengalir dengan alami ke manapun mereka suka.','Hidup yang baik adalah hidup yang diinspirasi oleh cinta dan dipandu oleh ilmu pengetahuan.','Kenyataannya, Anda tidak tahu apa yang akan terjadi besok. Hidup adalah pengendaraan yang gila dan tidak ada yang menjaminnya.','Hidup adalah mimpi bagi mereka yang bijaksana, permainan bagi mereka yang bodoh, komedi bagi mereka yang kaya, dan tragedi bagi mereka yang miskin','Hidup itu bukan soal menemukan diri Anda sendiri, hidup itu membuat diri Anda sendiri.','Hal yang paling penting adalah menikmati hidupmu, menjadi bahagia, apapun yang terjadi.','Hidup itu sederhana, kita yang membuatnya sulit.']
					const vasi = motiv[Math.floor(Math.random() * motiv.length)]
					vass = await getBuffer(`https://i.ibb.co/346nsHC/56806462-399407660892553-4745814299438481408-o.jpg`)
					client.sendMessage(from, vass, image, { quoted: mek, caption: '*Quotes Motivasi*\n\n'+ vasi })
					await limitAdd(sender)
					break
			case 'infonomor':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`Masukan Nomor\nContoh : ${prefix}infonomor 0812345678`)
				data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(11)}`)
				if (data.error) return reply(data.error)
				if (data.result) return reply(data.result)
				hasil = `╠➥ internasional : ${data.international}\n╠➥ nomor : ${data.nomor}\n╠➥ operator : ${data.op}`
				reply(hasil)
				await limitAdd(sender)
			break 
			case 'beritahoax':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.updatePresence(from, Presence.composing) 
				data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
				teks = '=================\n'
				for (let i of data.result) {
				teks += `*Gambar* : ${i.image}\n*Title* : ${i.title}\n*link* : ${i.link}\n*tag* : ${i.tag}\n=================\n`
				}
				reply(teks.trim())
				await limitAdd(sender)
			break
			case 'fototiktok':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(12)
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${gatauda}` , {method: 'get'})
			        buff = await getBuffer(anu.result)
				reply(buff)
			        await limitAdd(sender)
			break 
			case 'animequotes':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/quotesnime/random`, {method: 'get'})
				reply(anu.data.quote)
				await limitAdd(sender)
			break 
			case 'neonime':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				client.updatePresence(from, Presence.composing) 
				data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
				teks = '################\n'
				for (let i of data.result) {
					teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
				}
				reply(teks.trim())
				await limitAdd(sender)
			break 
			case 'twichquotes':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/twichquote`, {method: 'get'})
				reply(anu.result)
				await limitAdd(sender)
			break	
			/*case 'katacinta':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(8)
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {method: 'get'})
				reply(anu.result)
				await limitAdd(sender)
			break*/
			case 'kata':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				teks = body.slice(6)
	                        const kataa = ['Hanya ada satu hal yang membuat mimpi tak mungkin diraih: perasaan takut gagal.','Bermimpilah dalam hidup, jangan hidup dalam mimpi.','Melakukan apa yang Anda suka adalah kebebasan. Menyukai apa yang Anda lakukan adalah kebahagiaan.','Hidup tanpa kebebasan seperti tubuh tanpa roh.','Keadilan, kebenaran, kebebasan, itulah pangkal dari kebahagiaan.','Lebih baik mati berjuang demi kebebasan daripada menjadi tahanan sehari-hari dalam hidup Anda.','Masa terbaik dalam hidup seseorang adalah masa ia dapat menggunakan kebebasan yang telah direbutnya sendiri.','Bukan karna harta yang berlimpah dan uang yang banyak mampu membuat ku sukacita tetapi dengan kasih sayang dan keutuhan keluarga yang mampu membuat ku bahagia','Cinta bisa membuat waktu terlewati, dan waktu pun bisa membuat cinta terlewati','Kebahagiaan kita tergantung pada diri kita sendiri.','Beri nilai dari usahanya jangan dari hasilnya. Baru kita bisa menilai kehidupan.','Ingin menjadi orang lain adalah pemborosan dari dirimu.','Satu-satunya sumber dari pengetahuan adalah pengalaman.','Arti hidup adalah memberi makna hidup.','Tanpa inspirasi, kita akan binasa.','Cinta sejati bukan berarti tidak terpisahkan. Itu hanya berarti dipisahkan, namun, tidak ada yang berubah.','Waktu yang membuat segalanya menjadi berubah dan berbeda.','Jangan Membandingkan dirimu dengan orang lain. Bandingkan diri kamu dengan pribadi yang kemarin.','Hati yang tegar mampu memaafkan dengan ikhlas.','Cinta yang baik diawali dengan hati yang baik.','Keikhlasan adalah kesabaran sejati.','Apapun yang kamu lakukan, jangan pernah menyerah untuk mendapatkannya.','Jangan pernah berhenti ketika kamu masih belum ingin menyerah.','Bersyukur, bersyukur dan bersyukur karena Bersyukur ialah kebahagiaan sejati.','Ingat, ini hanya hari yang buruk, bukan kehidupan yang buruk.','Berani memulai atau nanti akan menyesal.','Belajar mengikhlaskan dan percaya akan rencana indahNya.','Lakukan sesuatu hari ini yang akan membuat dirimu di masa depan berterima kasih.','Doa adalah kata sayang yang paling sederhana dan tulus.','Jangan ragu untuk memaafkan diri sendiri. Robot saja bisa salah, apalagi manusia.','Bersedekah tidak akan membuat kita miskin.','Bersyukurlah sampai kamu lupa artinya mengeluh.','Teruslah percaya dan bekerja keraslah.','Jadilah pemaaf, yakni memaafkan diri sendiri lalu memberikan pemaafan yang besar pada orang lain.','Hargai, sebelum hilang.','Awal kebahagiaan adalah kenyamanan.','Selalu ada jalan bagi mereka yang mau berusaha.','Ketika aku lelah, hanya doa yang menguatkanku.','Sadar akan kekurangan lebih baik daripada bangga akan kelebihan.','Balas dendam terbaik adalah menjadikan dirimu lebih baik.','Apapun yang kamu lakukan, lakukan dengan sebaik mungkin.','Sesuatu akan sangat berharga, ketika sangat sulit untuk didapatkan.','Doa Ibu adalah kasih sayang terindah.','Kenikmatan sesungguhnya berawal dari kesabaran dan keikhlasan.','Agar masa depanmu lebih baik maka berusahalah mulai dari sekarang.','Lebih baik diam daripada panjang masalahnya.','Pandai-pandai bersyukur agar kita tidak mudah mengeluh.','Kesuksesan tidak menemukan kamu. Kamu harus keluar dan meraihnya.','Diam bukan berarti tak tahu, kadang hanya lelah karena *cukup tahu.*','Berbagi adalah tanda kemuliaan hati.','Segala sesuatu memiliki keindahan, tetapi tidak semua orang bisa melihat.','Hidup tidak memiliki batasan, kecuali yang kamu buat.','Tidak ada kata terlambat untuk menjadi apa Anda yang seharusnya.','Berani bermimpi, tapi yang lebih penting, berani melakukan tindakan di balik impianmu.','Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.','Percaya dan bertindak seolah-olah tidak mungkin gagal.','Mewujudkan apa yang kita inginkan adalah hadiah terbesar yang kita terima dari lahir','jangan pernah meremehkan diri sendiri. Jika kamu tak bahagia dengan hidupmu, perbaiki apa yg salah, dan teruslah melangkah','Sahabat adalah mereka yang mengerti masa lalumu, percaya pada masa depanmu, dan menerima kamu apa adanya','Sahabat sejati menangis saat kau pergi, sahabat palsu pergi saat kau menangis','Hidup terlalu singkat jika hanya menyesal. Hidup hanya sekali, namun jika digunakan dengan baik, sekali saja cukup!','Di mana Anda berada saat ini tidak menentukan di mana Anda akan berakhir','Begitu sulitnya mencari teman yang tak lupa kita ketika sudah tak lama berjumpa','Lebih baik memiliki 1 sahabat yang mengerti kita dari pada 1000 teman yang mementingkan dirinya sendiri','Kamu takkan bisa mendapatkan yang kamu inginkan jika kamu terlalu sibuk mengeluhkan apa yang telah kamu miliki. Bersyukurlah!','Di balik kekurangan pasti ada kelebihan, meskipun mata tertutup, tapi hati selalu bisa merasakan','Bahwa dalam suatu perjuangan kita harus berjuang terus sampai habis-habisan','Jangan membenci mereka yang mengatakan hal buruk tuk menjatuhkanmu, karena merekalah yang buatmu semakin kuat setiap hari','Orang yang malas telah membuang kesempatan yang diberikan Tuhan, padahal Tuhan tidak pernah menciptakan sesuatu dengan sia-sia','Ketika ragu menghampiri, ikuti kata hati. Beri pertanyaan, temukan sebuah jawaban. Belajarlah tuk mempercayai hati','Berbincang-bincang dengan kawan lama membuatmu menyadari seberapa besar hidupmu telah berubah','Berjalan dengan seorang sahabat dikegelapan,lebih berarti daripada berjalan sendirian ditempat yg terang banyak cahaya','Pada akhirnya kita tau bahwa cinta tidak datang pada 2 orang yang sempurna seperti yang kita harapkan','Bukan seberapa banyak yang kita punya yang memberikan kebahagiaan adalah seberapa besar kita menikmati apa yg kita punya','Orang yang gagah perkasa itu bukan orang yang bertubuh kekar melainkan orang yang mampu mengendalikan emosinya ketika marah','Terkadang, bukan kenangan buruk yang membuatmu bersedih, tapi kenangan indah yang kamu tahu, hal itu tak akan terulang kembali','Kebahagiaanmu tdk ditentukan orang lain, tapi dirimu sendiri. Apa yang kamu lakukan hari ini, tentukan bahagia masa depanmu','Ikhlas menerima kesalahan, dan belajar dari setiap kesalahan, karena itu yg akan menjadikanmu kuat dalam menjalani kehidupan','Sesuatu yang sangat sulit tuk melupakan seseorang yang telah memberimu begitu banyak hal tuk diingat','Perasaan yang paling berbahaya adalah iri, karena iri hati melahirkan kebencian dan kebencian akan membunuhmu perlahan','Yang penting itu bukan apa yang kita ketahui tapi apa yang kita bersedia pelajari','Butuh waktu untuk mendapatkan orang yang tepat','Orang yang telah tiada takkan mungkin kembali, seberapapun kamu mencintainya, kamu harus merelakan nya','Terkadang, bukan kenangan buruk yang membuatmu bersedih, tapi kenangan indah yang kamu tahu, hal itu tak akan terulang kembali','Cinta bisa membuat waktu terlewati, dan waktu pun bisa membuat cinta terlewati','Jika tak cinta, katakan saja. Jangan memberi harapan hampa, karena seseorang akan terluka. Jangan manfaatkan cinta!','Berpikir itu gampang, bertindak itu sulit, dan melaksanakan satu pikiran dalam tindakan adalah hal yang paling sulit di dunia','Jangan selalu katakan *masih ada waktu* atau *nanti saja*. Lakukan segera, gunakan waktumu dengan bijak','Meski bersahabat, kalian tak harus selalu bersama. Miliki waktumu sendiri. Tapi jangan lupakan mereka ketika kalian menemukan cinta','Kebahagiaan belum tentu membuat seseorang bersyukur. Tetapi bersyukurlah yang membuat seseorang meraih kebahagiaan','Hanya karena mereka tak memperlakukanmu seperti yang kamu inginkan, bukan berarti mereka tak mencintaimu setulus hati','Mereka yang membencimu hanya buktikan bahwa hidupmu lebih baik dari mereka. Jangan hiraukan mereka, teruslah melangkah','Risiko terbesar dalam hidup ini adalah tidak mengambil resiko sama sekali','Jadikan cobaan sebuah pelajaran, jangan pernah mengeluh karena kesusahan, di situ kita diajarkan untuk menjadi orang yang sabar','Sahabat adalah dia yang tahu kekuranganmu, tapi menunjukkan kelebihanmu. Dia yang tahu ketakutanmu, tapi menunjukkan keberanianmu','Saat terpisah, imajinasi adalah penghubung antara dua jiwa yang saling mencintai','Dalam cinta, ketika ada yg berbeda, jangan mencari siapa yg salah, karena kamu dan dia adalah tim yang sama dengan tujuan yang sama','Jangan pernah meremehkan diri sendiri. Jika kamu tak bahagia dengan hidupmu, perbaiki apa yg salah, dan teruslah melangkah','Bisa menertawakan diri sendiri akan sama halnya dengan mencintai diri sendiri.','Cantik yang sesungguhnya ialah dimana kamubisa menghargai diri sendiri.','Karena tidak akan ada kata bahagia jika tidak ada kesedihan.','Segala sesuatu yang terjadi membantu Anda tumbuh, meskipun saat ini sulit untuk melihatnya.','Orang hebat tidak dilahirkan begitu saja, mereka tumbuh menjadi hebat.','Jadilah diri sendiri; orang lain sudah diambil.','Hanya karena jalanku berbeda, tidak berarti aku tersesat.','Keberanian adalah mengetahui apa yang tidak perlu ditakuti.','Terkadang kamu menang, terkadang kamu belajar.','Jangan menangis, karena kamu adalah alasan seseorang tersenyum.','Biar bagaimanapun, tidak ada yang akan baik-baik saja tentang sebuah perpisahan.','Tidak ada satu orang pun yang terbiasa dengan kehilangan.','Aku mencintaimu. Biarlah ini urusanku. Bagaimana engkau kepadaku, itu urusanmu.','Tidak akan ada satupun orang yang terbiasa dengan kehilangan.','Asal kamunya tetap ada di bumi. Udah cukup, udah bikin aku senang.','Kalau gak ada kamu, aku suka rindu.','Tolong sampein ke Bunda, Terima kasih udah lahirin orang yang aku cinta.','Memang tidak salah untuk berharap, tapi aku harus tahu kapan berhenti.','Aku rela pensilku patah, asal jangan kamu yang matahin hatiku','Aku rela dibilang bucin, yang penting kamu nggak ngilang','Kamu itu kayak pahlawan ya, hebat meruntuhkan pertahanan hatiku','Kalau pahlawan dikenang, kamu nggak bakalan jadi kenangan','Kalau aku jadi wakil rakyat, pasti aku gagal. Soalnya aku selalu mikirin kamu, bukan rakyat','Aku memang pendiam, diam-diam jatuh cinta sama kamu','Beda operator nggak apa-apa deh, asal nanti nama kamu sama aku di Kartu Keluarga yang sama','Hujan pergi ninggalin pelangi, kamu pergi ninggalin air mataku','Tiap kali kamu senyum, seluruh dunia juga sedang tersenyum','Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya','Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya']
                                let siapaa = kataa[Math.floor(Math.random() * kataa.length)]
	                        client.sendMessage(from, siapaa, text, {quote: mek})
	                        await limitAdd(sender)
			break
			case 'katabijak':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const katas = ['Hanya ada satu hal yang membuat mimpi tak mungkin diraih: perasaan takut gagal.','Mimpi adalah jawaban hari ini atas pertanyaan-pertanyaan esok.','Bermimpilah dalam hidup, jangan hidup dalam mimpi.','Pemimpin yang baik harus siap berkorban untuk memperjuangkan kebebasan rakyatnya.','Melakukan apa yang Anda suka adalah kebebasan. Menyukai apa yang Anda lakukan adalah kebahagiaan.','Keadilan, kebenaran, kebebasan, itulah pangkal dari kebahagiaan.','Lebih baik mati berjuang demi kebebasan daripada menjadi tahanan sehari-hari dalam hidup Anda.','Kebahagiaan kita tergantung pada diri kita sendiri.','Beri nilai dari usahanya jangan dari hasilnya. Baru kita bisa menilai kehidupan.','Ingin menjadi orang lain adalah pemborosan dari dirimu.','Satu-satunya sumber dari pengetahuan adalah pengalaman.','Arti hidup adalah memberi makna hidup.','Tanpa inspirasi, kita akan binasa.','Cinta sejati bukan berarti tidak terpisahkan. Itu hanya berarti dipisahkan, namun, tidak ada yang berubah.','Waktu yang membuat segalanya menjadi berubah dan berbeda.','Jangan Membandingkan dirimu dengan orang lain. Bandingkan diri kamu dengan pribadi yang kemarin.','Hati yang tegar mampu memaafkan dengan ikhlas.','Cinta yang baik diawali dengan hati yang baik.','Keikhlasan adalah kesabaran sejati.','Apapun yang kamu lakukan, jangan pernah menyerah untuk mendapatkannya.','Jangan pernah berhenti ketika kamu masih belum ingin menyerah.','Bersyukur, bersyukur dan bersyukur karena Bersyukur ialah kebahagiaan sejati.','Ingat, ini hanya hari yang buruk, bukan kehidupan yang buruk.','Berani memulai atau nanti akan menyesal.','Belajar mengikhlaskan dan percaya akan rencana indahNya.','Lakukan sesuatu hari ini yang akan membuat dirimu di masa depan berterima kasih.','Doa adalah kata sayang yang paling sederhana dan tulus.','Jangan ragu untuk memaafkan diri sendiri. Robot saja bisa salah, apalagi manusia.','Bersedekah tidak akan membuat kita miskin.','Bersyukurlah sampai kamu lupa artinya mengeluh.','Teruslah percaya dan bekerja keraslah.','Jadilah pemaaf, yakni memaafkan diri sendiri lalu memberikan pemaafan yang besar pada orang lain.','Hargai, sebelum hilang.','Awal kebahagiaan adalah kenyamanan.','Selalu ada jalan bagi mereka yang mau berusaha.','Ketika aku lelah, hanya doa yang menguatkanku.','Sadar akan kekurangan lebih baik daripada bangga akan kelebihan.','Balas dendam terbaik adalah menjadikan dirimu lebih baik.','Apapun yang kamu lakukan, lakukan dengan sebaik mungkin.','Sesuatu akan sangat berharga, ketika sangat sulit untuk didapatkan.','Doa Ibu adalah kasih sayang terindah.','Kenikmatan sesungguhnya berawal dari kesabaran dan keikhlasan.','Agar masa depanmu lebih baik maka berusahalah mulai dari sekarang.','Lebih baik diam daripada panjang masalahnya.','Pandai-pandai bersyukur agar kita tidak mudah mengeluh.','Kesuksesan tidak menemukan kamu. Kamu harus keluar dan meraihnya.','Diam bukan berarti tak tahu, kadang hanya lelah karena *cukup tahu.*','Berbagi adalah tanda kemuliaan hati.','Segala sesuatu memiliki keindahan, tetapi tidak semua orang bisa melihat.','Hidup tidak memiliki batasan, kecuali yang kamu buat.','Tidak ada kata terlambat untuk menjadi apa Anda yang seharusnya.','Berani bermimpi, tapi yang lebih penting, berani melakukan tindakan di balik impianmu.','Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.','Percaya dan bertindak seolah-olah tidak mungkin gagal.','Mewujudkan apa yang kita inginkan adalah hadiah terbesar yang kita terima dari lahir','jangan pernah meremehkan diri sendiri. Jika kamu tak bahagia dengan hidupmu, perbaiki apa yg salah, dan teruslah melangkah','Sahabat adalah mereka yang mengerti masa lalumu, percaya pada masa depanmu, dan menerima kamu apa adanya','Sahabat sejati menangis saat kau pergi, sahabat palsu pergi saat kau menangis','Hidup terlalu singkat jika hanya menyesal. Hidup hanya sekali, namun jika digunakan dengan baik, sekali saja cukup!','Di mana Anda berada saat ini tidak menentukan di mana Anda akan berakhir','Begitu sulitnya mencari teman yang tak lupa kita ketika sudah tak lama berjumpa','Lebih baik memiliki 1 sahabat yang mengerti kita dari pada 1000 teman yang mementingkan dirinya sendiri','Kamu takkan bisa mendapatkan yang kamu inginkan jika kamu terlalu sibuk mengeluhkan apa yang telah kamu miliki. Bersyukurlah!','Di balik kekurangan pasti ada kelebihan, meskipun mata tertutup, tapi hati selalu bisa merasakan','Bahwa dalam suatu perjuangan kita harus berjuang terus sampai habis-habisan','Jangan membenci mereka yang mengatakan hal buruk tuk menjatuhkanmu, karena merekalah yang buatmu semakin kuat setiap hari','Orang yang malas telah membuang kesempatan yang diberikan Tuhan, padahal Tuhan tidak pernah menciptakan sesuatu dengan sia-sia','Ketika ragu menghampiri, ikuti kata hati. Beri pertanyaan, temukan sebuah jawaban. Belajarlah tuk mempercayai hati','Berbincang-bincang dengan kawan lama membuatmu menyadari seberapa besar hidupmu telah berubah','Berjalan dengan seorang sahabat dikegelapan,lebih berarti daripada berjalan sendirian ditempat yg terang banyak cahaya','Pada akhirnya kita tau bahwa cinta tidak datang pada 2 orang yang sempurna seperti yang kita harapkan','Bukan seberapa banyak yang kita punya yang memberikan kebahagiaan adalah seberapa besar kita menikmati apa yg kita punya','Orang yang gagah perkasa itu bukan orang yang bertubuh kekar melainkan orang yang mampu mengendalikan emosinya ketika marah','Terkadang, bukan kenangan buruk yang membuatmu bersedih, tapi kenangan indah yang kamu tahu, hal itu tak akan terulang kembali','Kebahagiaanmu tdk ditentukan orang lain, tapi dirimu sendiri. Apa yang kamu lakukan hari ini, tentukan bahagia masa depanmu','Ikhlas menerima kesalahan, dan belajar dari setiap kesalahan, karena itu yg akan menjadikanmu kuat dalam menjalani kehidupan','Sesuatu yang sangat sulit tuk melupakan seseorang yang telah memberimu begitu banyak hal tuk diingat','Perasaan yang paling berbahaya adalah iri, karena iri hati melahirkan kebencian dan kebencian akan membunuhmu perlahan','Yang penting itu bukan apa yang kita ketahui tapi apa yang kita bersedia pelajari','Butuh waktu untuk mendapatkan orang yang tepat','Orang yang telah tiada takkan mungkin kembali, seberapapun kamu mencintainya, kamu harus merelakan nya','Terkadang, bukan kenangan buruk yang membuatmu bersedih, tapi kenangan indah yang kamu tahu, hal itu tak akan terulang kembali','Cinta bisa membuat waktu terlewati, dan waktu pun bisa membuat cinta terlewati','Jika tak cinta, katakan saja. Jangan memberi harapan hampa, karena seseorang akan terluka. Jangan manfaatkan cinta!','Berpikir itu gampang, bertindak itu sulit, dan melaksanakan satu pikiran dalam tindakan adalah hal yang paling sulit di dunia','Jangan selalu katakan *masih ada waktu* atau *nanti saja*. Lakukan segera, gunakan waktumu dengan bijak','Meski bersahabat, kalian tak harus selalu bersama. Miliki waktumu sendiri. Tapi jangan lupakan mereka ketika kalian menemukan cinta','Kebahagiaan belum tentu membuat seseorang bersyukur. Tetapi bersyukurlah yang membuat seseorang meraih kebahagiaan','Hanya karena mereka tak memperlakukanmu seperti yang kamu inginkan, bukan berarti mereka tak mencintaimu setulus hati','Mereka yang membencimu hanya buktikan bahwa hidupmu lebih baik dari mereka. Jangan hiraukan mereka, teruslah melangkah','Risiko terbesar dalam hidup ini adalah tidak mengambil resiko sama sekali','Jadikan cobaan sebuah pelajaran, jangan pernah mengeluh karena kesusahan, di situ kita diajarkan untuk menjadi orang yang sabar','Sahabat adalah dia yang tahu kekuranganmu, tapi menunjukkan kelebihanmu. Dia yang tahu ketakutanmu, tapi menunjukkan keberanianmu','Saat terpisah, imajinasi adalah penghubung antara dua jiwa yang saling mencintai','Dalam cinta, ketika ada yg berbeda, jangan mencari siapa yg salah, karena kamu dan dia adalah tim yang sama dengan tujuan yang sama','Jangan pernah meremehkan diri sendiri. Jika kamu tak bahagia dengan hidupmu, perbaiki apa yg salah, dan teruslah melangkah']
				let bijak = katas[Math.floor(Math.random() * katas.length)]
				client.sendMessage(from, bijak, text, {quote: mek})
				await limitAdd(sender)
			break
			case 'katacinta':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
	                        const katacintaaa = ['Aku rela dibilang bucin, yang penting kamu nggak ngilang.','Dimana ada cinta, disitu ada kehidupan. Dimana ada kebencian disitu ada kerusakan. Namun kebencian terkadang bagian dari kasih sayang yang mendalam','Seorang teman tidak dapat disebut sebagai teman, sehingga ia menjaga temannya dalam tiga hal : dalam musibahnya, ketidakhadirannya, dan kematiannya','Orang yang tidak menguasai matanya, maka hatinya tak berharga','Bahagia itu sederhana; mensyukuri, mencintai dan menjaga apa yg kita miliki','Di sakiti oleh pasangan sekali saja kadang kita langsung sedih, tapi taukah anda berapa banyak kita melukai perasaan Ibu?','Jangan bandingkan orang yg mencintaimu dengan masa lalumu. Hargai dia yg kini berusaha membuatmu bahagia!','Kadang kamu harus dengarkan kata hati. Jangan tanyakan siapa yang kamu cintai, tapi tanyakan siapa yang buatmu bahagia','Sederhana dalam mencintai, ikhlas menerima kekurangan, dan setia dalam menjalin hubungan.','Orang yang suka berkata jujur mendapatkan tiga hal : Cinta, Kepercayaan, dan Rasa Hormat','Bahagia adalah ketika kamu memiliki orang yang peduli, mencintai, dan mengerti dirimu lebih dari kamu mengerti diri sendiri.','Cinta tak kan menuntut kesempurnaan. Cinta kan menerima, memahami, rela berkorban. Karena seharusnya cinta membuatmu bahagia, bukan tersiksa.','Berhenti menyesali cinta yg telah pergi. Jika dia memang sejatimu, tak peduli betapa sulitnya, dia pasti menemukan jalannya kembali.','Tak perlu marah & benci pada mereka yg membencimu tanpa sebab, lihatlah Tuhan yg senantiasa menyayangimu tanpa syarat.','Bila Anda ingin bahagia, buatlah tujuan yang bisa mengendalikan pikiran, melepaskan tenaga, serta mengilhami harapan Anda,','Jangan buang waktumu hanya untuk menunggu sesuatu yang tidak pasti. Hidup ini butuh kepastian, bukan hanya angan pun harapan.','Senjata yang paling ampuh dimuka bumi ini adalah jiwa seorang yang sedang dirundung asmara','Sabar itu ada dua, yaitu sabar terhadap sesuatu yang kita benci, dan sabar terhadap apa yang kita sukai','Jika Tuhan senantiasa memberikan cinta kepada hambaNya, maka kenapa kita tidak bersegera untuk memantaskan diri?','Mencintai seseorang akan memberikan kita kekuatan, dan dicintai seseorang akan memberikan kita keberanian yang besar','Cinta mampu membangun jembatan yang menghubungkan dua jiwa insan yang berbeda.','Cinta itu terlalu suci untuk dinodai,\nterlalu tinggi untuk dikhianati,\nterlalu indah untuk dikotori.\nKarena ia adalah anugerah yang harus dijaga kesuciannya,\nDiagungkan ketinggiannya, dan dikagumi keindahannya.','Hal yang paling menyakitkan adalah kehilangan jati dirimu saat engkau terlalu mencintai seseorang.\nSerta lupa bahwa sebenarnya engkau juga spesial','Asmara bukan hanya sekedar saling memandang satu sama lain. Tapi juga sama sama melihat ke satu arah yang sama.','Cinta itu seperti angin. Kau tak dapat melihatnya, tapi kau dapat merasakannya.','Karena hati tidak perlu memilih, ia selalu tahu kemana harus berlabuh,','Aku mencintaimu. Itu sebabnya aku takkan pernah selesai mendoakan keselamatanmu.','Aku tidak terlalu peduli pada uang. Uang tidak dapat kupakai untuk membeli cinta','Kau tak bisa mengukur cinta seperti mengukur panjang jalan atau tinggi gedung.','Cinta sekejap mata, terkenang sepanjang masa.','Cinta tidak terlihat dengan mata, tetapi dengan hati.']
	                        let cintass = katacintaaa[Math.floor(Math.random() * katacintaaa.length)]
	                        client.sendMessage(from, cintass, text, {quote: mek})
	                        await limitAdd(sender)
			break/*
			case 'dadu':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
	                        const daduz = ['https://i.ibb.co/tXLFRv1/dadu1.png','https://i.ibb.co/Ypyz0nV/dadu2.png','https://i.ibb.co/YkDT5GZ/dadu3.png','https://i.ibb.co/SX7Vh7m/dadu4.png','https://i.ibb.co/0nPSYQQ/dadu5.png','https://i.ibb.co/gtsFMVK/dadu6.png']
				let ainedadu = daduz[Math.floor(Math.random() * daduz.length)]
				client.sendMessage(from, ainedadu, image, {quote: mek})
				await limitAdd(sender)
			break*/
			case 'suit':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
	                        const suithh = ['*Hasil* : Menang\n\n*Jawaban Mu* : ✊ Batu\n\n*Jawaban Bot* : ✌️ Gunting\n\n*Poin* : 100','*Hasil* : Kalah\n\n*Jawaban Mu* : ✋ Kertas\n\n*Jawaban Bot* : ✌️ Gunting\n\n*Poin* : 0','*Hasil* : Seri\n\n*Jawaban Mu* : ✌️ Gunting\n\n*Jawaban Bot* : ✌️ Gunting\n\n*Poin* : 50','*Hasil* : Seri\n\n*Jawaban Mu* : ✊ Batu\n\n*Jawaban Bot* : ✊ Batu\n\n*Poin* : 50','*Hasil* : Menang\n\n*Jawaban Mu* : ✋ Kertas\n\n*Jawaban Bot* : ✊ Batu\n\n*Poin* : 100','*Hasil* : Menang\n\n*Jawaban Mu* : ✌️ Gunting\n\n*Jawaban Bot* : ✋ Kertas\n\n*Poin* : 100','*Hasil* : Kalah\n\n*Jawaban Mu* : ✊ Batu\n\n*Jawaban Bot* : ✋ Kertas\n\n*Poin* : 0','*Hasil* : Seri\n\n*Jawaban Mu* : ✋ Kertas\n\n*Jawaban Bot* : ✋ Kertas\n\n*Poin* : 50','*Hasil* : Kalah\n\n*Jawaban Mu* : ✌️ Gunting\n\n*Jawaban Bot* : ✊ Batu\n\n*Poin* : 0','*Hasil* : Seri\n\n*Jawaban Mu* : ✊ Batu\n\n*Jawaban Bot* : ✊ Batu\n\n*Poin* : 50','*Hasil* : Menang\n\n*Jawaban Mu* : ✋ Kertas\n\n*Jawaban Bot* : ✊ Batu\n\n*Poin* : 100']
                                let suiitz = suithh[Math.floor(Math.random() * suithh.length)]
	                        client.sendMessage(from, suiitz, text, {quote: mek})
	                        await limitAdd(sender)
			break
				//mhazria 
			case 'resepmasakan':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://mnazria.herokuapp.com/api/resep?key=${body.slice(14)}`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				buff = await getBuffer(anu.thumb_item)
				hasil = `*title* \n ${anu.title} *item_name* \n ${anu.item_name} *ingredient* \n${anu.ingredient} *step* \n${anu.step}`
				client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
				await limitAdd(sender)
			break 
			case 'ssweb':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Urlnya mana kak')
				teks = body.slice(7)
				reply(ind.wait())
				anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
				buff = await getBuffer(anu.gambar)
				client.sendMessage(from, buff, image, {quoted: mek})
				await limitAdd(sender)
			break
			case 'map':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
				buffer = await getBuffer(anu.gambar)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				await limitAdd(sender)
			break
			case 'kbbi':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Apa yang mau dicari kak?')
				anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
				reply('Menurut Kbbi:\n\n'+anu.result)
				await limitAdd(sender)
			break
			case 'artinama':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Apa yang mau dicari um?')
				anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(10)}`, {method: 'get'})
				reply('Menurut nama:\n\n'+anu.result)
				await limitAdd(sender)
			break
			case 'kodepos':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				tuull = body.slice(9)
				data = await fetchJson(`https://videfikri.com/api/kodepos/?query=${tuull}`)
				copss = `Profinsi : ${data.result.provinsi} \nKota : ${data.result.kota} \nKelurahan : ${data.result.kelurahan} \nKecamatan : ${data.result.kecamatan} \nKodepos : ${data.result.kodepos}`
				reply(copss)
				await limitAdd(sender)
			break
			case 'faktaunik':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://videfikri.com/api/fakta/`, {method: 'get'})
				reply(anu.result.fakta)
				await limitAdd(sender)
			break
			case 'pesankosong': 
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, ' ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏', MessageType.text, { quoted: mek})
			break
			/*case 'pantun':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gatauda = body.slice(8)					
				anu = await fetchJson(`https://api.zeks.xyz/api/pantun?apikey=apivinz`, {method: 'get'})
				reply(anu.result.pantun)
				await limitAdd(sender)
			break*/
			case 'ccgenerator':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://videfikri.com/api/ccgenerator/`)
				qisur = `KARTU : ${data.result.card.network}\nNOMOR : ${data.result.card.number}\nCVV : ${data.result.card.cvv}\nPIN : ${data.result.card.pin}\nSALDO : ${data.result.card.balance}\nTAHUN KADALUARSA : ${data.result.card.expiration_year}\nNAMA : ${data.result.customer.name}\nALAMAT : ${data.result.customer.address}\nNEGARA : ${data.result.customer.country}`
				reply(qisur)
				await limitAdd(sender)
			break
			case 'namaninja':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('kasih teks lah^_^!!!')
				data = await fetchJson(`https://api.terhambar.com/ninja?nama=${body.slice(11)}`)
				reply(data.result.ninja)
			        await limitAdd(sender)
			break
		case 'halah': 
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://api-yogipw.herokuapp.com/api/vokal/halah?kata=${body.slice(7)}&apikey=yogipw`, {method: 'get'})
					reply(anu.result.result)
					await limitAdd(sender)
					break
		case 'hilih': 
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://videfikri.com/api/hilih/?query=${body.slice(7)}`, {method: 'get'})
					reply(anu.result.kata)
					await limitAdd(sender)
					break
		case 'huluh': 
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://api-yogipw.herokuapp.com/api/vokal/huluh?kata=${body.slice(7)}&apikey=yogipw`, {method: 'get'})
					reply(anu.result.result)
					await limitAdd(sender)
					break
		case 'heleh': 
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://api-yogipw.herokuapp.com/api/vokal/heleh?kata=${body.slice(7)}&apikey=yogipw`, {method: 'get'})
					reply(anu.result.result)
					await limitAdd(sender)
					break
		case 'holoh': 
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://api-yogipw.herokuapp.com/api/vokal/holoh?kata=${body.slice(7)}&apikey=yogipw`, {method: 'get'})
					reply(anu.result.result)
					await limitAdd(sender)
					break
			//auto respond 
			case 'ping':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, `${process.uptime()} _Second_`, MessageType.text, { quoted: mek} )
			break
			case 'help': 
			case 'menu':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				const uangku = checkATMuser(sender)
				const pepolu = JSON.parse(fs.readFileSync('./database/bot/totalcmd.json'))[0].totalcmd
				await costum(ind.menu(pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku, role, client, process, pepolu, groupMetadata, groupAdmins, isGroup, isGroupAdmins, isLevelingOn, isWelkom, isOwner, isAntiLink, isBadWord), text, tescuk, cr)
			break
			case 'info':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, `Mau cari info apa kak?\nInfo:\n${prefix}infodev\n${prefix}infoadmin\n${prefix}infogempa\n${prefix}infocuaca\n${prefix}infonomor`,MessageType.text, { quoted: mek} )
			break
			case 'infodev':
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				me = client.user
				uptime = process.uptime()
				teks = `*INFO DEVELOPER*\n*Owner bot* : Muhammad Ridwan Reynaldy\n*No Owner* : wa.me/62895330379186\n*Ig owner* : www.instagram.com/anemio999\n━━━━━━━━━━━━━━━━━━━━\n*INFO BOT*\n*Nama bot* : ${me.name}\n*Nomor bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total block contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Fans page FB* : https://www.facebook.com/ainneboot\n*Ketik* : ${prefix}lpr _Untuk melaporkan admin bot melalui bot_\n*Ketik* : ${prefix}owner untuk menghubungi admin bot kami.`
				buffer = await getBuffer(`https://i.ibb.co/4jknX6w/pp.jpg`)
				client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
			break
			case 'infoadmin':
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				me = client.user
				uptime = process.uptime()
				teks = `*INFO ADMIN*\n*Admin bot* : Brema\n*Admin bot* : Thamrin\n*Admin bot* : Kozet\n*Admin bot* : Dandy\n*Admin bot* : Rahmad\n*Admin bot* : Muh Alwi \n*No Brema* : wa.me/6282237617224\n*No Thamrin* : wa.me/6281394344776\n*No Kozet* : wa.me/628994622890\n*No Dandy* : wa.me/6285878523158\n*No Rahmad* : wa.me/6283108164709\n*No Muh Alwi* : wa.me/6287762758045\n*Ig Brema* : www.instagram.com/bremab.bangun\n*Ig Thamrin* : www.instagram.com/thamrin_fariz\n*Ig Kozet* : www.instagram.com/Official_kozet\n*Ig Dandy* : www.instagram.com/px.dandy.w.syahputra\n*Ig Rahmad* : www.instagram.com/kangmas201\n*Ig Muh Alwi* : www.instagram.com/Alwi_Alfiza\n━━━━━━━━━━━━━━━━━━━━\n*INFO BOT*\n*Nama bot* : ${me.name}\n*Nomor bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total block contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Fans page FB* : https://www.facebook.com/ainneboot\n*Ketik* : ${prefix}lpr _Untuk melaporkan admin bot melalui bot_\n*Ketik* : ${prefix}owner untuk menghubungi admin bot kami.`
				buffer = await getBuffer(`https://i.ibb.co/4jknX6w/pp.jpg`)
				client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
			break
			case 'infogempa':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply( 'Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://videfikri.com/api/infogempa/`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				hasil = `*Bujur*\n${anu.result.bujur}\n*Lokasi*\n${anu.result.wilayah}\n*Magnitude*\n${anu.result.magnitudo}\n*Lintang*\n${anu.result.lintang}\n*Kedalaman*\n${anu.result.kedalaman}\n*Waktu*\n${anu.result.waktu}`
				client.sendMessage(from, hasil, text, {quoted: mek})
				await limitAdd(sender)
			break
			case 'infocuaca':
				tels = body.slice(11)
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply( 'Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				anu = await fetchJson(`https://rest.farzain.com/api/cuaca.php?id=${tels}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				hasil = `*Tempat* : ${anu.respon.tempat}\n*Cuaca* : ${anu.respon.cuaca}\n*Angin* : ${anu.respon.angin}\n*Suhu* : ${anu.respon.suhu}\n*Kelembapan* : ${anu.respon.kelembapan}`
				client.sendMessage(from, hasil, text, {quoted: mek})
				await limitAdd(sender)
			break
			case 'covid':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply( 'Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`)
				hasil = `Positif : ${data.positif}\nSembuh : ${data.sembuh}\nMeninggal : ${data.meninggal}\nDirawat : ${data.dirawat}\nLast Update : ${data.lastUpdate}`
				reply(hasil)
				await limitAdd(sender)
			break
			case 'snk':
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				me = client.user
				uptime = process.uptime()
				teks = `*Syarat & Ketentuan Ainebot*\n1. Teks dan nama pengguna WhatsApp anda kami simpan di dalam server selama bot aktif.\n2. Data anda akan di hapus ketika bot offline.\n3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim.\n4. Kami tidak pernah meminta anda untuk memberikan informasi pribadi.\n5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.\n6. Cukup perintah 1x jika bot tidak merespon harap ulangi kembali, Jika di ulangi kembali tidak merespon, Bot tidak aktif\n7. Dilarang spam, Share virus virtex, Telpon, Video call, Kami akan blockir anda.\n8. Apapun yang anda perintah pada bot ini, *KAMI TIDAK BERTANGGUNG JAWAB!*\n\nTERIMA KASIH !~`
				buffer = await getBuffer(`https://i.ibb.co/4jknX6w/pp.jpg`)
				client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
			break
			case 'lpr':
				const bug = body.slice(5)
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (bug.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
				var nomor = mek.participant
				const teks1 = `*[LAPORAN]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${bug}`
				var options = {
				text: teks1,
				contextInfo: {mentionedJid: [nomor]},
				}
				client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
				reply('Pesan telah di kirim ke owner aine\nPesan palsu atau main² tidak akan ditanggapi.')
			break
			case 'konfirmasi':
				const kfrms = body.slice(12)
				if (!isGroup) return reply('Maaf konfirmasi hanya bisa di group!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (kfrms.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
				var kfrmsnomor = mek.participant
				const teksh1 = `*[LAPORAN]*\nNomor : @${kfrmsnomor.split("@s.whatsapp.net")[0]}\nPesan : ${kfrms}`
				var options = {
				text: teksh1,
				contextInfo: {mentionedJid: [kfrmsnomor]},
				}
				client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
				reply(`[WAIT] Sedang mengirim code konfirmasi melalui SMS...\n\nNote:\n• Harap Gunakan nomor kamu\ncontoh: ${prefix}konfirmasi 089654360447\n• Aine akan mengirimkan code konfirmasi untuk bisa mengakses.\n• Code konfirmasi hanya bisa di gunakan dipribadi!\n• Nomor yang tidak bisa di SMS maka tidak akan bisa menggunakan aine!`)
			break
			case 'calladmin':
			case 'callowner':
					if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const callmin = body.slice(11)
					if (callmin.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
					var nomorhh = mek.participant
					const teksq1 = `*[Memanggil admin]*\nNomor : @${nomorhh.split("@s.whatsapp.net")[0]}\nPesan : ${callmin}`
					var options = {
					text: teksq1,
					contextInfo: {mentionedJid: [nomorhh]},
					}
					client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
					reply('[WAIT] Sedang menghubungi admin kami, Mungkin ini membutuhkan waktu lama..')
					break
			case 'calldeveloper':
					if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const calldev = body.slice(11)
					if (calldev.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
					var nomorhhjj = mek.participant
					const teksd1 = `*[Memanggil developer]*\nNomor : @${nomorhh.split("@s.whatsapp.net")[0]}\nPesan : ${calldev}`
					var options = {
					text: teksd1,
					contextInfo: {mentionedJid: [nomorhhjj]},
					}
					client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
					reply('[WAIT] Sedang menghubungi developer kami, Mungkin ini membutuhkan waktu lama..')
					break
			case 'request':
					if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const cfrr = body.slice(8)
					if (cfrr.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
					var nomor = mek.participant
					const ress = `*[REQUEST VITUR]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${cfrr}`
							var options = {
							text: ress,
                         				contextInfo: {mentionedJid: [nomor]},
                     			}
					client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
					reply('REQUEST ANDA TELAH SAMPAI KE OWNER DAN ADMIN AINEBOT\nRequests palsu atau main² tidak akan ditanggapi.')
					break
			case 'requestlimit':
					if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const cfrrs = body.slice(13)
					if (cfrrs.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
					var nomores = mek.participant
					const ressso = `*[REQUEST VITUR]*\nNomor : @${nomores.split("@s.whatsapp.net")[0]}\nPesan : ${cfrrs}`
							var options = {
							text: ressso,
                         				contextInfo: {mentionedJid: [nomores]},
                     			}
					client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
					reply('Request limit akan di ')
			break
			case 'smsfree':
					if (!isPremium) return reply('Maaf kamu bukan user premium!')
					if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					const sms = body.slice(8)
					if (sms.length > 300) return client.sendMessage(from, 'Nomor telpon targetnya mana kak?', msgType.text, {quoted: mek})
					var nomorrs = mek.participant
					const resse = `*[REQUEST VITUR]*\nNomor : @${nomorrs.split("@s.whatsapp.net")[0]}\nPesan : ${sms}`
							var options = {
							text: resse,
                         				contextInfo: {mentionedJid: [nomorrs]},
                     			}
					client.sendMessage('62895330379186@s.whatsapp.net', options, text, {quoted: mek})
					reply('SMS Anda akan terikirim, Mohon sabar kami proses..\nJika tidak terkirim maka kuota sms kami telah habis!!')
			break
			case 'sms':
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, 'Nomor targetnya mana kak',MessageType.text, { quoted: mek} )
				client.sendMessage(from, 'Pesannya pengiriman apa kak?',MessageType.text, { quoted: mek} )
				client.sendMessage(from, 'Contohnya #smsfree nomor|pesan',MessageType.text, { quoted: mek} )
				client.sendMessage(from, 'Maximal 30 text',MessageType.text, { quoted: mek} )
			break
			case 'blocklist': 
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				teks = '*This is list of blocked number* :\n'
				for (let block of blocked) {
					teks += `*~>* @${block.split('@')[0]}\n`
					}
					teks += `*Total* : ${blocked.length}`
				client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
				break 
			case 'donasi':
			case 'donate':
				if (!isRegistered) return reply(ind.noregis())
				client.sendMessage(from, donasi(), text)
				break
			case 'menupicture':
			case 'menupict':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				buffer = await getBuffer(`https://i.ibb.co/tqf0P7q/Whats-App-Image-2021-02-22-at-01-46-22.png`)
				client.sendMessage(from, buffer, image, { quoted: mek, caption: randompict(prefix)})
			break
			case 'menuowner':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				buffer = await getBuffer(`https://i.ibb.co/5nBhggv/2b84cc9cb84d76bc5c2b27e81d6aecfd.png`)
				client.sendMessage(from, buffer, image, { quoted: mek, caption: developer(prefix)})
			break
			case 'menugrup':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				buffer = await getBuffer(`https://i.ibb.co/FD4RSBH/ppmenu.jpg`)
				client.sendMessage(from, buffer, image, { quoted: mek, caption: menugrup(prefix)})
			break
			case 'bahasa':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, bahasa(), text)
				await limitAdd(sender)
			break
			case 'kodenegara':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				client.sendMessage(from, negara(), text)
				await limitAdd(sender)
			break
			case 'owner':
				client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
				client.sendMessage(from, 'Tuh nomer owner ku >_<, jangan spam atau ku block kamu',MessageType.text, { quoted: mek} )
			break
			case 'buypremium':
					client.sendMessage(from, 'Ingin membeli premium?\nHarap hubungi kami : wa.me/62895330379186',MessageType.text, { quoted: mek} )
			break
			case 'hargaprem':
			case 'hargapremium':
					client.sendMessage(from, 'Quiz owner = random (premium)\nLevel 100 = Free 3 day (premium)\n10k = 7day (premium)\n25k = perbulan (premium)\n50k = 1 tahun (premium)\n1 group = 150k 7day (minimal 100 anggota untuk premium)',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Harap hubungi kami :\nwa.me/62895330379186',MessageType.text, { quoted: mek} )
			break
			case 'gcainebot':
					client.sendMessage(from, 'https://chat.whatsapp.com/HlIbSDEOseg9iUBvEBrtq0',MessageType.text, { quoted: mek} )
			break
			case 'listchat':
					client.sendMessage(from, '• P\n• Bot\n• Hai\n• Iya\n• Mau\n• Test\n• Aine\n• Gelay\n• Sayang\n• Makasih\n• Huaaa\n• Gratata\n• My number\n• Assalamualaikum',MessageType.text, { quoted: mek} )
			break
			case 'spam5':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
  				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
  					client.updatePresence(from, Presence.composing) 
					teks = `${body.slice(7)}`
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					await limitAdd(sender)
			break
			case 'spam20':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
  				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
  					client.updatePresence(from, Presence.composing) 
					teks = `${body.slice(7)}`
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					await limitAdd(sender)
			break
			case 'spam10':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
  				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
  					client.updatePresence(from, Presence.composing) 
					teks = `${body.slice(7)}`
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					client.sendMessage(from, 'Aine paling keren 😎',MessageType.text, { quoted: mek} )
					await limitAdd(sender)
			break
			case 'spamcall':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (args.length < 1) return reply('Nomor nya mana kak?!!!')
					data = await fetchJson(`https://id.jagreward.com/member/verify-mobile/${body.slice(10)}`)
					spcall = `*Nomor Aine* : _${data.phone_prefix}_\n\n_Aine berhasil menlpon anda!_`
					reply(spcall)
				        await limitAdd(sender)
					break
			case 'leaderboard':
			case 'lb':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				bo = args[0]
				_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
				uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
				let leaderboardlvl = '-----[ *LEADERBOARD LEVEL* ]----\n\n'
				let leaderboarduang = '-----[ *LEADERBOARD UANG* ]----\n\n'
				let nom = 0
				try {
					for (let i = 0; i < 10; i++) {
					nom++
					leaderboardlvl += `*[${nom}]* ${_level[i].id.replace('@s.whatsapp.net', '')}\n◪  *XP*: ${_level[i].xp}\n◪  *Level*: ${_level[i].level}\n`
					leaderboarduang += `*[${nom}]* ${uang[i].id.replace('@s.whatsapp.net', '')}\n◪  *Uang*: _Rp${uang[i].uang}_\n◪  *Limit*: ${limitawal - _limit[i].limit}\n`
				}
				await reply(leaderboardlvl)
				await reply(leaderboarduang)
				} catch (err) {
				console.error(err)
				await reply(`minimal ${len} user untuk bisa mengakses database`)
				}
			break
			case 'limit':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				checkLimit(sender)
			break 
			case 'giftlimit': 
				if (!isAdmin) return reply('Hanya admin yang bisa melakukan giftlimit')
				const nomerr = args[0].replace('@','')
				const jmla = args[1]
				if (jmla <= 1) return reply(`minimal gift limit adalah 1`)
				if (isNaN(jmla)) return reply(`limit harus berupa angka`)
				if (!nomerr) return reply(`maaf format salah\nmasukan parameter yang benar\ncontoh : ${prefix}giftlimit @62895710074883 20`)
				const cysz = nomerr + '@s.whatsapp.net'
				var found = false
                    		 Object.keys(_limit).forEach((i) => {
				if(_limit[i].id === cysz){
                                found = i
				}
				})
				if (found !== false) {
				_limit[found].limit -= jmla
				const updated = _limit[found]
				const result = `Gift kuota limit sukses dengan SN: ${createSerial(20)} pada ${moment().format('DD/MM/YY HH:mm:ss')}
				*「 GIFT KUOTA LIMIT 」*

				• User : @${updated.id.replace('@s.whatsapp.net','')}
				• Limit: ${limitawal-updated.limit}`
				console.log(_limit[found])
				fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit));
				reply(result)
				} else {
                                reply(`Maaf, nomor ${nomerr} tidak terdaftar di database!`)
				}
			break
			case 'mutual':
				if (!isRegistered) return reply( ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
				anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
				await reply('Looking for a partner...')
				await reply(`wa.me/${anug}`)
				await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
			break
			case 'next':
				if (!isRegistered) return reply( ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
				anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
				await reply('Looking for a partner...')
				await reply(`wa.me/${anug}`)
				await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
			break
			case 'transfer':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!q.includes('|')) return  reply(ind.wrongf())
				const tujuan = q.substring(0, q.indexOf('|') - 1)
				const jumblah = q.substring(q.lastIndexOf('|') + 1)
				if(isNaN(jumblah)) return await reply('jumlah harus berupa angka!!')
				if (jumblah < 2000 ) return reply(`minimal transfer 2000`)
				if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
				const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
				fee = 0.010 *  jumblah
				hasiltf = jumblah - fee
				addKoinUser(tujuantf, hasiltf)
				confirmATM(sender, jumblah)
				addKoinUser('62895710073737@s.whatsapp.net', fee)
				reply(`*「 SUKSES 」*\n\npengiriman uang telah sukses\ndari : +${sender.split("@")[0]}\nke : +${tujuan}\njumblah transfer : ${jumblah}\npajak : ${fee}`)
			break
			case 'dompet':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const kantong = checkATMuser(sender)
				reply(ind.uangkau(pushname, sender, kantong))
			break
			case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				payout = body.slice(10)
				if(isNaN(payout)) return await reply('limit harus berupa angka!!')
				const koinPerlimit = 5000
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n*harga limit* : ${koinPerlimit}/limit\n*sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran\n${createSerial(20)}`)
				} 
				break
			case 'buypremiumlimit':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				payout = body.slice(17)
				const koinpremPerlimit = 500
				const totalprem = koinpremPerlimit * payout
				if ( checkATMuser(sender) <= totalprem) return reply(`Maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)
				if ( checkATMuser(sender) >= totalprem ) {
					confirmATM(sender, totalprem)
					bayarLimit(sender, payout)
					await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n*Pengirim* : Admin\n*Penerima* : ${pushname}\n*Nominal pembelian* : ${payout} \n*Harga limit* : ${koinpremPerlimit}/limit\n*Sisa uang mu* : ${checkATMuser(sender)}\n\nProses berhasil dengan nomer pembayaran\n${createSerial(20)}`)
				} 
			break
				//no rest api 
			case 'slap':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				kapankah = body.slice(1)
				const slap =['anjing','babi lu','anak anjing','udah tolol nub Lagi','muka lo kek monyet','udah jomblo sendirian lagi dirumah tolol','so so an mau punya pacar muka aja kek monyet lepass dari kandang','ganteng doang di toxic aja dibilang baperan','pantek kau','bangsat kau','ku entod kalian nangis kau','setan lu semua','lihat anak anjing lagi baca','ganteng doang jemput cewe dipanggang','kamu cantik beb bullshit anjing cowo buaya','anak dajjal','puki lu','anjing ngajak gelud','sama hantu takut cupu setan','cupu cupu aja gausah bacot','setan lu semua','bocah lu semua setan','3 Hari Lagi']
				const ple = slap[Math.floor(Math.random() * slap.length)]
				pod = await getBuffer(`https://i.ibb.co/d51j7VP/tampar.jpg`)
				client.sendMessage(from, pod, image, { quoted: mek, caption: '*Toxic*\n\n'+ ple })
				await limitAdd(sender)
			break
			case 'tampar':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/slap', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'brainly':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				brien = body.slice(9)
				brainly(`${brien}`).then(res => {
				teks = '❉───────────❉\n'
				for (let Y of res.data) {
					teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────❉\n`
				}
				client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
				console.log(res)
				})
				await limitAdd(sender)
			break
			case 'kalkulator':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n• Untuk Perkalian Menggunakan *\n• Untuk Pertambahan Menggunakan +\n• Untuk Pengurangan Menggunakan -\n• Untuk Pembagian Menggunakan /`)
				const Math_js = require('mathjs')
				mtk = body.slice(12)
				if (typeof Math_js.evaluate(mtk) !== "number") {
					reply(`"${mtk}", Kesalahan!\n[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n• Untuk Perkalian Menggunakan *\n• Untuk Pertambahan Menggunakan +\n• Untuk Pengurangan Menggunakan -\n• Untuk Pembagian Menggunakan /`)
				} else {
					reply(`*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`)
				}
				await limitAdd(sender)
			break
			case 'bisakah':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				bisakah = body.slice(1)
				const bisa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
				const keh = bisa[Math.floor(Math.random() * bisa.length)]
				client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'kapankah':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				kapankah = body.slice(1)
				const kapan =['Besok','Lusa','1 Hari Lagi','2 Hari Lagi','3 Hari Lagi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','7 Bulan Lagi','8 Bulan Lagi','9 Bulan Lagi','10 Bulan Lagi','11 Bulan Lagi','1 Tahun lagi','2 Tahun lagi','3 Tahun lag0i','4 Tahun lagi','5 Tahun lagi','6 Tahun lagi','7 Tahun lagi','8 Tahun lagi','9 Tahun lagi','10 Tahun lagi']
				const koh = kapan[Math.floor(Math.random() * kapan.length)]
				client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'apakah':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				apakah = body.slice(1)
				const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
				const kah = apa[Math.floor(Math.random() * apa.length)]
				client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'bagaimanakah':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				bagaimanakah = body.slice(1)
				const bagai =['Kita Kenal?','Nanya Terus deh','Tidak Tahu','Coba Ulangi','Cari Aja Sendiri','Kurang Tahu','Mana Saya Tahu, Saya kan ikan']
				const mana = bagai[Math.floor(Math.random() * bagai.length)]
				client.sendMessage(from, 'Pertanyaan : *'+bagaimanakah+'*\n\nJawaban : '+ mana, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'rate':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				rate = body.slice(1)
				const ra =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const te = ra[Math.floor(Math.random() * ra.length)]
				client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'sangecek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				sange = body.slice(1)
				const sang =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const nge = sang[Math.floor(Math.random() * sang.length)]
				client.sendMessage(from, 'Pertanyaan : *'+sange+'*\n\nJawaban : '+ nge+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
                	case 'gaycek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				gayy = body.slice(1)
				const gay =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const yag = gay[Math.floor(Math.random() * gay.length)]
				client.sendMessage(from, 'Pertanyaan : *'+gayy+'*\n\nJawaban : '+ yag+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
        	        case 'lesbicek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				lesbii = body.slice(1)
				const lesbi =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const bi = lesbi[Math.floor(Math.random() * lesbi.length)]
				client.sendMessage(from, 'Pertanyaan : *'+lesbii+'*\n\nJawaban : '+ bi+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
                	case 'gantengcek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				ganteng = body.slice(1)
				const gan =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const teng = gan[Math.floor(Math.random() * gan.length)]
				client.sendMessage(from, 'Pertanyaan : *'+ganteng+'*\n\nJawaban : '+ teng+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'cantikcek':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				cantik = body.slice(1)
				const can =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
				const tik = can[Math.floor(Math.random() * can.length)]
				client.sendMessage(from, 'Pertanyaan : *'+cantik+'*\n\nJawaban : '+ tik+'%', text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'watak':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				watak = body.slice(1)
				const wa =['Penyayang','Pemurah','Pemarah','Pemaaf','Penurut','Baik','Baperan','Baik Hati','penyabar','UwU','top deh, pokoknya','Suka Membantu']
				const tak = wa[Math.floor(Math.random() * wa.length)]
				client.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'hobby':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				hobby = body.slice(1)
				const hob =['Memasak','Membantu Atok','Mabar','Nobar','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
				const by = hob[Math.floor(Math.random() * hob.length)]
				client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'truth':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const trut =['Pernah bohong sama ortu apa aja?\nCoba ceritakan tentang kebohongannya','Apa makanan yang kamu sukai?','Siapa yang mau di jadikan pacar di gc ini?','Apa mimpi terburukmu?','Apa hal paling memalukan dari temanmu?','Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
				const ttrth = trut[Math.floor(Math.random() * trut.length)]
				truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
				client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
				await limitAdd(sender)
			break
			case 'dare':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const dare =['Ambil foto aine, jadikan foto profil kamu selama 1 hari','Ambil foto aine, jadikan foto profil kamu selama 1 hari','Ambil foto aine, jadikan foto profil kamu selama 1 hari','VN nyanyi balonku ada 5','Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
				const der = dare[Math.floor(Math.random() * dare.length)]
				tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
				client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
				await limitAdd(sender)
			break	
			case 'terkeren':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					jds = []
					const jdiidc = groupMembers
					const kosstc = groupMembers
					const akuutc = jdiidc[Math.floor(Math.random() * jdiidc.length)]
					teks = `Yang terkeren di grub ini adalah @${akuutc.jid.split('@')[0]}`
					jds.push(akuutc.jid)
					mentions(teks, jds, true)
					await limitAdd(sender)
			break	
			case 'terburik':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					jds = []
					const jdiidr = groupMembers
					const kosstr = groupMembers
					const akuutr = jdiidr[Math.floor(Math.random() * jdiidr.length)]
					teks = `Yang terburik di grub ini adalah @${akuutr.jid.split('@')[0]}`
					jds.push(akuutr.jid)
					mentions(teks, jds, true)
					await limitAdd(sender)
			break
			case 'slot':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const sl = ['🍊 : 🍒 : 🍐',
'🍒 : 🔔 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🔔',
'🔔 : 🍒 : 🍐',
'🔔 : 🍒 : 🍊',
'🍊 : 🍋 : 🔔',
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🔔 : 🔔 : 🍇',
'🍌 : 🍒 : 🔔',
'🍐 : 🔔 : 🔔',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🔔 : 🔔 : 🍇',
'🔔 : 🍐 : 🍇',
'🔔 : 🔔 : 🔔',
'🍒 : 🍒 : 🍒',
'🍌 : 🍌 : 🍌']
				const ot = sl[Math.floor(Math.random() * sl.length)]
				client.sendMessage(from, ot, MessageType.text, { quoted: mek} )
				client.sendMessage(from, `[  🎰 | SLOTS | 🎰  ]\n-------------------\n🍌 : 🍒 : 🔔\n${ot}<===\n🔔 : 🍐 : 🍇\n\nKeterangan : Jika anda Mendapatkan 3Buah Sama Berarti Kamu Win\n\nContoh : 🍌 : 🍌 : 🍌<=====`, text, { quoted: mek })
				await limitAdd(sender)
			break
			case 'tagme':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					var ainenoms = mek.participant
					const tagx = {
					text: `@${ainenoms.split("@s.whatsapp.net")[0]} Tuh udah aine tag 🤭`,
					contextInfo: { mentionedJid: [ainenoms] }
					}
					client.sendMessage(from, tagx, text, {quoted: mek})
					await limitAdd(sender)
			break
			case 'ciumme':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					var aineciums = mek.participant
					const ciumtag = {
					text: `Muaach @${aineciums.split("@s.whatsapp.net")[0]} 😘`,
					contextInfo: { mentionedJid: [aineciums] }
					}
					client.sendMessage(from, ciumtag, text, {quoted: mek})
					await limitAdd(sender)
			break
			case 'pelukme':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					var ainepeluks = mek.participant
					const peluktag = {
					text: `Peyuuk @${ainepeluks.split("@s.whatsapp.net")[0]} 🤗`,
					contextInfo: { mentionedJid: [ainepeluks] }
					}
					client.sendMessage(from, peluktag, text, {quoted: mek})
					await limitAdd(sender)
			break
			case 'cium2':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
                                        cfghh = body.slice(7)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di cipok*')
					mentionedaine = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentionedaine.length > 1) {
						teks = ''
						for (let _ of mentionedaine) {
							teks += `Muaach 😘 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentionedaine, true)
						client.sendMessage(from, mentionedaine)
					} else {
						mentions(`Muaach @${mentionedaine[0].split('@')[0]} 😘`, mentionedaine, true)
						client.sendMessage(from, mentionedaine)
					}
					await limitAdd(sender)
			break
			case 'peluk2':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
                                        cfghh = body.slice(8)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di peluk*')
					mentionedaines = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentionedaines.length > 1) {
						teks = ''
						for (let _ of mentionedaines) {
							teks += `Peyuuk 🤗 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentionedaines, true)
						client.sendMessage(from, mentionedaines)
					} else {
						mentions(`Peyuuk kak @${mentionedaines[0].split('@')[0]} 🤗`, mentionedaines, true)
						client.sendMessage(from, mentionedaines)
					}
					await limitAdd(sender)
			break
			case 'perkosa':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, Aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
                                        cfghh = body.slice(7)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di cipok*')
					mentionedainees = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentionedainees.length > 1) {
						teks = ''
						for (let _ of mentionedainees) {
							teks += `Auto Perkosa 🤤:\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentionedainees, true)
						client.sendMessage(from, mentionedainees)
					} else {
						mentions(`Auto Perkosa @${mentionedainees[0].split('@')[0]} 🤤`, mentionedainees, true)
						client.sendMessage(from, mentionedainees)
					}
					await limitAdd(sender)
			break
			case 'profile':
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
    				client.updatePresence(from, Presence.composing)
    				try {
					ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					 profile = `╭─「 PROFILE ANDA 」\n│• Name: ${pushname}\n│• XP: ${getLevelingXp(sender)}\n│• Level: ${getLevelingLevel(sender)}\n│• Role: ${role}\n│• User Terdaftar: ✓\n│• Link: wa.me/${sender.split("@")[0]}\n╰──────────────────`
					buffer = await getBuffer(ppimg)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: profile})
			break
			case 'jadian':
				if (!isRegistered) return reply( ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					jds = []
					const jdii = groupMembers
					const koss = groupMembers
					const akuu = jdii[Math.floor(Math.random() * jdii.length)]
					const diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `Ciee.. yang lagi jadian @${akuu.jid.split('@')[0]} ♥️ @${diaa.jid.split('@')[0]} `
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					await limitAdd(sender)
					break
			case 'fitnah':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
				var ainegs = body.slice(8)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				var replace = ainegs.split("|")[0];
				var target = ainegs.split("|")[1];
				var bot = ainegs.split("|")[2];
				client.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
				await limitAdd(sender)
			break
			case 'ttp':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://salism3api.pythonanywhere.com/text2img/?text=${body.slice(5)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.image} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
			break
			case 'attp':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply(`Teksnya Mana Kak\n*Contoh ${prefix}attp Aine*`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
				client.sendMessage(from, attp2, sticker, {quoted: mek})
				await limitAdd(sender)
			break
			case 'ocr': 
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(ind.wait())
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('kirim foto dengan caption ${prefix}ocr')
					}
					await limitAdd(sender)
				break
			case 'stickergif':
			case 'stikergif':
			case 'sgif':
			case 'stiker': 
			case 'sticker':
			case 's':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				await limitAdd(sender)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									 if (error) {
											 reply(ind.stikga())
											 fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(ind.wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									if (error) {
											 reply(ind.stikga())
											 fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
			case 'tts':
			case 'gtts':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return client.sendMessage(from, 'Diperlukan kode bahasa!!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana kak', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan kak')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return reply('Gagal kak:(')
							client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender)
			break
			case 'simi':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply( 'Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (args.length < 1) return reply('Textnya mana kak?')
				teks = body.slice(5)
				anu = await simih(teks) 
				reply(anu)
			break 
			case 'simii':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				data = await fetchJson(`https://pencarikode.xyz/api/simsimii?text=${body.slice(7)}?&apikey=pais`)
				reply(data.result)
			break
			case 'toimg':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isQuotedSticker) return reply('Reply stickernya kak!')
				reply(ind.wait())
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return reply(ind.stikga())
					buffer = fs.readFileSync(ran)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*UDAH JADI SETAN*'})
					fs.unlinkSync(ran)
				})
				await limitAdd(sender)
			break 
			case 'tiktokstalk':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				try {
					if (args.length < 1) return client.sendMessage(from, 'Username apa kak?', text, {quoted: mek})
					let { user, stats } = await tiktod.getUserProfileInfo(args[0])
					reply(ind.wait())
					teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
					buffer = await getBuffer(user.avatarLarger)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
				} catch (e) {
					console.log(`Error :`, color(e,'red'))
					reply('[ERROR] KEMUNGKINAN USERNAME TIDAK VALID')
				}
				await limitAdd(sender)
			break
				//group feature 
			case 'hidetag':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				var value = body.slice(9)
				var group = await client.groupMetadata(from)
				var member = group['participants']
				var mem = []
				member.map( async adm => {
				mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
				})
				var options = {
				text: value,
				contextInfo: { mentionedJid: mem },
				quoted: mek
				}
				client.sendMessage(from, options, text)
				await limitAdd(sender)
			break
			case 'wa.me':
			case 'wame':
  				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
  				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
  				client.updatePresence(from, Presence.composing) 
  				options = {
  				text: `「 *SELF WHATSAPP* 」\n\n_Request by_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nYour link WhatsApp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
  				contextInfo: { mentionedJid: [sender] }
  				}
  				client.sendMessage(from, options, text, { quoted: mek } )
  				break
  				if (data.error) return reply(data.error)
  				reply(data.result)
				await limitAdd(sender)
  				break
			case 'add':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				if (cfgh.length > 14) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 14 Teks', msgType.text, {quoted: mek})
				if (args.length < 1) return reply('Please use number callphone and use country code!')
				if (args[0].startsWith('08')) return reply('Please use country code!')
				try {
					num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
					client.groupAdd(from, [num])
				} catch (e) {
					console.log('Error :', e)
					reply('Gagal menambahkan target, mungkin karena di private')
				}
			break
			/*case 'add':
				client.sendMessage(from, 'Maaf fitur add tidak tersedia!\nKarena rentan benned oleh pihak whatsapp.',MessageType.text, { quoted: mek} )
			break*/
			case 'level':
				if (!isRegistered) return reply(ind.noregis())
				if (!isLevelingOn) return reply(ind.lvlnoon())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				const userLevel = getLevelingLevel(sender)
				const userXp = getLevelingXp(sender)
				if (userLevel === undefined && userXp === undefined) return reply(ind.lvlnul())
				const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
				resul = `◪ *LEVEL*\n  ├─ ❏ *Name* : ${pushname}\n  ├─ ❏ *Nomor* : ${sender.split("@")[0]}\n  ├─ ❏ *User XP* : ${userXp}/${requiredXp}\n  ├─ ❏ *Pangkat* : ${role}\n  └─ ❏ *User Level* : ${userLevel}\n`
				costum(resul, text, tescuk, per)
			break 
			case 'mining':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pushname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isEventon) return reply(`Maaf ${pushname} event mining tidak di aktifkan oleh owner`)
				if (isOwner | isAdmin | isPremium) {
				const one = Math.ceil(Math.random() * 10000000000000000000000000)
				addLevelingXp(sender, one)
				await reply(`Kamu bagian dari transaksi aine, aine akan berikan sebanyak *${one}Xp* untuk anda`)
                 		} else {
				const mining = Math.ceil(Math.random() * 1000000000000)
				addLevelingXp(sender, mining)
				await reply(`*Selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
				}
				await limitAdd(sender)
			break
			case 'closetime':    
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				client.updatePresence(from, Presence.composing) 
				if (args[1]=="detik") {var timer = args[0]+"000"
				} else if (args[1]=="menit") {var timer = args[0]+"0000"
				} else if (args[1]=="jam") {var timer = args[0]+"00000"
				} else {return reply("*Pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
				setTimeout( () => {
					var nomoor = mek.participant
					const close = {
					text: `*ᴛᴇᴘᴀᴛ ᴡᴀᴋᴛᴜ* ɢʀᴜᴘ ᴅɪᴛᴜᴛᴜᴘ ᴏʟᴇʜ ᴀᴅᴍɪɴ @${nomoor.split("@s.whatsapp.net")[0]}\nꜱᴇᴋᴀʀᴀɴɢ *ʜᴀɴʏᴀ ᴀᴅᴍɪɴ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ᴘᴇꜱᴀɴ`,
					contextInfo: { mentionedJid: [nomoor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
				}, timer)
			break
			case 'opentime': 
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				client.updatePresence(from, Presence.composing) 
				if (args[1]=="detik") {var timer = args[0]+"000"
				} else if (args[1]=="menit") {var timer = args[0]+"0000"
				} else if (args[1]=="jam") {var timer = args[0]+"00000"
				} else {return reply("*Pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
				setTimeout( () => {
					var nomoer = mek.participant
					const open = {
					text: `*ᴛᴇᴘᴀᴛ ᴡᴀᴋᴛᴜ* ɢʀᴜᴘ ᴅɪʙᴜᴋᴀ ᴏʟᴇʜ ᴀᴅᴍɪɴ @${nomoer.split("@s.whatsapp.net")[0]}\nꜱᴇᴋᴀʀᴀɴɢ *ᴍᴇᴍʙᴇʀ* ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ᴘᴇꜱᴀɴ`,
					contextInfo: { mentionedJid: [nomoer] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false);
					reply(open)
				}, timer)
				break
			case 'grup':
			case 'group':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				if (args[0] === 'buka') {
				reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
				} else if (args[0] === 'tutup') {
					reply(`*BERHASIL MENUTUP GROUP*`)
				client.groupSettingChange(from, GroupSettingChange.messageSend, true)
				}
			break
			case 'gc10':
			case 'grup10':
			case 'group10':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka10m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 10 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup10m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 10 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break
			case 'gc20':
			case 'grup20':
			case 'group20':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka20m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 20 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup20m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 20 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break
			case 'gc30':
			case 'grup30':
			case 'group30':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka30m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine buka', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 30 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup30m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine tutup', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 30 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break
			case 'gc40':
			case 'grup40':
			case 'group40':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka40m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine buka', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine buka', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 40 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup40m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine tutup', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine tutup', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 40 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break
			case 'gc50':
			case 'grup50':
			case 'group50':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka50m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 3000000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine buka', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine buka', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine buka', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '50 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 50 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup50m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 3000000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine tutup', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine tutup', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine tutup', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '50 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 50 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break
			case 'gc60':
			case 'grup60':
			case 'group60':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka60m') {
					setTimeout( () => {
					reply(`*BERHASIL MEMBUKA GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					}, 3600000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine buka', text)
					}, 3000000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine buka', text)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine buka', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine buka', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '50 menit grup ini akan aine buka', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '60 menit grup ini akan aine buka', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 60 menit grup ini akan aine buka', text)
					}, 0)
					} else if (args[0] === 'tutup60m') {
					setTimeout( () => {
					reply(`*BERHASIL MENUTUP GROUP*`)
					client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}, 3600000)
					setTimeout( () => {
					client.sendMessage(from, '10 menit grup ini akan aine tutup', text)
					}, 3000000)
					setTimeout( () => {
					client.sendMessage(from, '20 menit grup ini akan aine tutup', text)
					}, 2400000)
					setTimeout( () => {
					client.sendMessage(from, '30 menit grup ini akan aine tutup', text)
					}, 1800000)
					setTimeout( () => {
					client.sendMessage(from, '40 menit grup ini akan aine tutup', text)
					}, 1200000)
					setTimeout( () => {
					client.sendMessage(from, '50 menit grup ini akan aine tutup', text)
					}, 600000)
					setTimeout( () => {
					client.sendMessage(from, '60 menit grup ini akan aine tutup', text)
					}, 2500)
					setTimeout( () => {
					client.sendMessage(from, 'Dalam waktu 60 menit grup ini akan aine tutup', text)
					}, 0)
					}
			break    
			case 'join':
				if (!isPremium) return reply(`Hubungi kami jika ingin mengundang aine ke grup kamu, ketik ${prefix}owner`)
				const joen = await client.acceptInvite (body.slice(32))
				reply("SUCCESS join to : *" + joen.gid + "*" )
			break
			case 'readmore':
			case 'more':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				const more = String.fromCharCode(8206)
				const readMore = more.repeat(4001)
				if (!q.includes('|')) return  reply(ind.wrongf())
				const text1 = q.substring(0, q.indexOf('|') - 0)
				const text2 = q.substring(q.lastIndexOf('|') + 1)
				reply( text1 + readmore + text2)
			break
			case 'setname':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				client.groupUpdateSubject(from, `${body.slice(9)}`)
				client.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
			break
			case 'setdesc':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
				client.groupUpdateDescription(from, `${body.slice(9)}`)
				client.sendMessage(from, 'Succes, Ganti Deskripsi Grup', text, {quoted: mek})
			break
			case 'demote':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                                        cfgghh = body.slice(8)
					if (cfgghh.length > 16) return client.sendMessage(from, 'Maaf Nomor Terlalu Panjang, Maksimal 16 Teks', msgType.text, {quoted: mek})
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di turunkan admin group!*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*Perintah diterima, menurunkan jadi admin group* :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`*Perintah diterima, menurunkan* @${mentioned[0].split('@')[0]} *jadi admin group*`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
			break
			case 'promote':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                                        cfghh = body.slice(9)
					if (cfghh.length > 16) return client.sendMessage(from, 'Maaf Nomor Terlalu Panjang, Maksimal 16 Teks', msgType.text, {quoted: mek})
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di jadikan admin group!*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*Selamat* 🥳 *Anda naik menjadi admin group* 🎉:\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`*Selamat* 🥳 @${mentioned[0].split('@')[0]} *Anda naik menjadi admin group* 🎉`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
			break
			case 'kick':
					if (isBanned) return reply('Maaf kamu sudah terbenned!')
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                                        cfgh = body.slice(6)
					if (cfgh.length > 16) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 16 Teks', msgType.text, {quoted: mek})
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					setTimeout( () => {
					client.sendMessage(from, 'Sampah group berkurang 😂', text)
					}, 8000)
					setTimeout( () => {
					reply('Berhasil mengusir sampah group ini!')
					}, 7000)
					setTimeout( () => {
					client.groupRemove(from, mentioned)
					}, 6000)
					setTimeout( () => {
					client.sendMessage(from, `Aine telah mengeluarkan anda : wa.me/${mentioned[0].split('@')[0]}`, text) // ur cods
					}, 5000)
					setTimeout( () => {
					client.sendMessage(from, 'Asik aine dapat jatah kick 😆', text)
					}, 2500)
					setTimeout( () => {
					reply('Perintah diterima oleh aine')
					}, 0)
			break
			case 'listadmin':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
			break
			case 'welcome':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('*Fitur welcome sudah aktif sebelum nya*')
						welkom.push(from)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCCSESS ❭ mengaktifkan fitur welcome di group ini')
						client.sendMessage(from,`Perhatian kepada seluruh member fitur welcome group aktif apabila ada member join, bot akan selalu menyapanya`, text)
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCCSESS ❭ menonaktifkan fitur welcome di group ini ')
					} else {
						reply(ind.satukos())
					}
			break 
			case 'simih':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('*Fitur simih sudah aktif sebelum nya*')
						samih.push(from)
						fs.writeFileSync('./database/bot/simi.json', JSON.stringify(samih))
						reply('❬ SUCCSESS ❭ mengaktifkan fitur simi di group ini')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./database/bot/simi.json', JSON.stringify(samih))
						reply('❬ SUCCSESS ❭ menonaktifkan fitur simi di group ini')
					} else {
						reply(ind.satukos())
					}
			break
			case 'nsfw':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('*Fitur nsfw sudah aktif sebelum nya*')
						nsfw.push(from)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCCSESS ❭ mengaktifkan fitur nsfw di group ini')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCCSESS ❭ menonaktifkan fitur nsfw di group ini')
					} else {
						reply(ind.satukos())
					}
			break
		case 'afk':
	                if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
	                if (isAfkOn) return reply(ind.afkOnAlready())
	                if (isLimit(sender)) return reply(ind.limitend(pushname))
	                limitAdd(sender)
	                reason = body.slice(5)
					if (reason === undefined || reason === ' ' || reason === '') { reason = 'nothing'}
	                addAfkUser(sender, time, reason)
	                reply(ind.afkOn(pushname, reason))
	            break
                case 'leveling':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Mengaktifkan tekan on, Menonaktif tekan on')
					if (args[0] === 'on') {
					if (isLevelingOn) return reply('*Fitur leveling sudah aktif sebelum nya*')
						_leveling.push(from)
						fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
					reply(ind.lvlon())
					client.sendMessage(from,`Perhatian kepada seluruh member fitur level group aktif jika kalian nimbrung, bot akan selalu menambahkan xp, uang, limit`, text)
					} else if (args[0] === 'off') {
						_leveling.splice(from, 1)
						fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
					reply(ind.lvloff())
					} else {
					reply(ind.satukos())
					}
		break 
		case 'antibadword':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Ketik on untuk mengaktifkan, atau Ketik off untuk menonaktifkan')
					if (args[0] === 'on') {
              				if (isBadWord) return reply('*Fitur BadWord sudah aktif sebelum nya*')
						badword.push(from)
						fs.writeFileSync('./database/group/badword.json', JSON.stringify(badword))
                  	                        reply(`Sukses mengaktifkan anti badword group di group ini ✔️`)
					client.sendMessage(from,`Perhatian kepada seluruh member antibadword group aktif jika kalian berkata kotor, anda akan di kick!`, text)
					} else if (args[0] === 'off') {
						badword.splice(from, 1)
                 	   			fs.writeFileSync('./database/group/badword.json', JSON.stringify(badword))
                 	                        reply(`Sukes menonaktifkan anti badword group di group ini ✔️`)
					} else {
					reply(ind.satukos())
					}
		break
		case 'antivirtex':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Ketik on untuk mengaktifkan, atau Ketik off untuk menonaktifkan')
					if (args[0] === 'on') {
              				if (isAntiVirtex) return reply('*Fitur BadWord sudah aktif sebelum nya*')
						antivirtex.push(from)
						fs.writeFileSync('./database/group/antivirtex.json', JSON.stringify(antivirtex))
                  	                        reply(`Sukses mengaktifkan anti virtex group di group ini ✔️`)
					client.sendMessage(from,`Perhatian kepada seluruh member antivirtex group aktif jika kalian kirim virtex, anda akan di kick+blockir!`, text)
					} else if (args[0] === 'off') {
						antivirtex.splice(from, 1)
                 	   			fs.writeFileSync('./database/group/antivirtex.json', JSON.stringify(antivirtex))
                 	                        reply(`Sukes menonaktifkan anti virtex group di group ini ✔️`)
					} else {
					reply(ind.satukos())
					}
		break
		case 'linkgc':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isBotGroupAdmins) return reply(ind.badmin())
				linkgc = await client.groupInviteCode (from)
				yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				client.sendMessage(from, yeh, text, {quoted: mek})
			        await limitAdd(sender)
		break
		case 'tagall':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*~>* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
		break
		case 'delete':
		case 'del':
		case 'd':
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true }) 
		break 
		case 'addbadword':
				if (!isAdmin) return reply('Only Admin Us!')
				if (!isGroupAdmins) return reply(ind.admin())
				if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
				const bw = body.slice(12)
				bad.push(bw)
				fs.writeFileSync('./database/group/bad.json', JSON.stringify(bad))
				reply('Success Menambahkan Bad Word!')
		break
                case 'delbadword':
				if (!isAdmin) return reply(ind.ownerb())
				if (!isGroupAdmins) return reply('Only Admin Us!')
				if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
				let dbw = body.slice(12)
				bad.splice(dbw)
				fs.writeFileSync('./database/group/bad.json', JSON.stringify(bad))
				reply('Success Menghapus BAD WORD!')
		break 
                case 'listbadword':
				let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
				for (let i of bad) {
				lbw += `➸ ${i.replace(bad)}\n`
				}
				await reply(lbw)
                break 
                //admin feature 
		/*case 'kickall':
				if (!isOwner) return reply(ind.ownerb())
			        members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*😘* ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					client.groupRemove(from, members_id)
		break*/
		case 'setreply':
				if (!isOwner) return reply(ind.ownerb())
				client.updatePresence(from, Presence.composing) 
				if (args.length < 1) return
				cr = body.slice(10)
				reply(`reply berhasil di ubah menjadi : ${cr}`)
				await limitAdd(sender)
		break 
		case 'clone':
				if (!isGroup) return reply(ind.groupo())
				if (!isOwner) return reply(ind.ownerg()) 
				if (args.length < 1) return reply(' *TAG YANG MAU DI CLONE!!!* ')
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
				try {
					pp = await client.getProfilePicture(id)
					buffer = await getBuffer(pp)
					client.updateProfilePicture(botNumber, buffer)
					mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
				} catch (e) {
					reply(ind.stikga())
				}
		break
		case 'event':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*Fitur event sudah aktif sebelum nya*')
						event.push(from)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ SUCCSESS ❭ mengaktifkan fitur event di group ini*')
						client.sendMessage(from,`Perhatian kepada seluruh member fitur event group aktif apabila anda mining akan mendapatkan xp, dan limit`, text)
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ SUCCSESS ❭ menonaktifkan fitur event di group ini*')
					} else {
						reply(ind.satukos())
					}
			break
			case 'eventt':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isAdmin) return reply('*Only Admin Bot Us*')
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*Fitur event sudah aktif sebelum nya*')
						event.push(from)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('❬ SUCCSESS ❭ mengaktifkan fitur event di group ini')
						client.sendMessage(from,`Perhatian kepada seluruh member fitur event group aktif apabila anda mining akan mendapatkan xp, dan limit`, text)
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('❬ SUCCSESS ❭ menonaktifkan fitur event di group ini')
					} else {
						reply(ind.satukos())
					}
			break
			case 'antilink':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('*Anti link group sudah aktif*')
						antilink.push(from)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('Sukses mengaktifkan anti link group di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						antilink.splice(from, 1)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('Sukes menonaktifkan anti link group di group ini ✔️')
					} else {
						reply(ind.satukos())
					}
			break
			case 'antilinkig':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isAntiIg) return reply('*Anti link instagram sudah aktif*')
						antiig.push(from)
						fs.writeFileSync('./database/group/antiig.json', JSON.stringify(antiig))
						reply('Sukses mengaktifkan anti link instagram di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link instagram aktif apabila anda promosi link instagram anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						antiig.splice(from, 1)
						fs.writeFileSync('./database/group/antiig.json', JSON.stringify(antiig))
						reply('Sukes menonaktifkan anti link instagram di group ini ✔️')
					} else {
						reply(ind.satukos())
					}
			break
			case 'antilinkigg':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isAntiIgg) return reply('*Anti link instagram sudah aktif*')
						antiigg.push(from)
						fs.writeFileSync('./database/group/antiigg.json', JSON.stringify(antiigg))
						reply('Sukses mengaktifkan anti link instagram di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link instagram aktif apabila anda promosi link instagram anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						antiigg.splice(from, 1)
						fs.writeFileSync('./database/group/antiigg.json', JSON.stringify(antiigg))
						reply('Sukes menonaktifkan anti link instagram di group ini ✔️')
					} else {
						reply(ind.satukos())
					}
			break
			case 'antilinkytt':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isAntiYtt) return reply('*Anti link youtube sudah aktif*')
						antiytt.push(from)
						fs.writeFileSync('./database/group/antiytt.json', JSON.stringify(antiytt))
						reply('Sukses mengaktifkan anti link youtube di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link youtube aktif apabila anda promosi link youtube anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						antiytt.splice(from, 1)
						fs.writeFileSync('./database/group/antiytt.json', JSON.stringify(antiytt))
						reply('Sukes menonaktifkan anti link youtube di group ini ✔️')
					} else {
						reply(ind.satukos())
					}
			break
			case 'antilinkyt':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Mengaktifkan tekan 1, Menonaktif tekan 0')
					if (Number(args[0]) === 1) {
						if (isAntiYt) return reply('*Anti link youtube sudah aktif*')
						antiyt.push(from)
						fs.writeFileSync('./database/group/antiyt.json', JSON.stringify(antiyt))
						reply('Sukses mengaktifkan anti link youtube di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link youtube aktif apabila anda promosi link youtube anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						antiyt.splice(from, 1)
						fs.writeFileSync('./database/group/antiyt.json', JSON.stringify(antiyt))
						reply('Sukes menonaktifkan anti link youtube di group ini ✔️')
					} else {
						reply(ind.satukos())
					}
			break
			case 'block':
					client.updatePresence(from, Presence.composing) 
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir wa.me/${body.slice(8)}@c.us`, text)
			break
			case 'unblock':
					client.updatePresence(from, Presence.composing) 
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(10)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir wa.me/${body.slice(10)}`, text)
			break
			case 'blockk':
					client.updatePresence(from, Presence.composing) 
					client.chatRead (from)
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isAdmin) return reply('*Only Admin bot*')
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `*Perintah Diterima, Memblokir* ${body.slice(7)}@c.us`, text)
					break
			case 'unblockk':
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isAdmin) return reply('*Only Admin bot*')
					client.blockUser (`${body.slice(10)}@c.us`, "remove")
					client.sendMessage(from, `*Perintah Diterima, Membuka Blockir* ${body.slice(9)}@c.us`, text)
					break
			case 'setppbot':
					if (!isOwner) return reply(ind.ownerb())
					client.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
			break 
			case 'setpp': 
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					media = await client.downloadAndSaveMediaMessage(mek)
					await client.updateProfilePicture (from, media)
					reply('SUCCESS CHANGE PROFILE GROUP')
			break				
			case 'leave':
					if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
					if (!isOwner) return reply(ind.ownerb())
					setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
					setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'Sampai jumpa 👋', text) // ur cods
					}, 0)
			break
			case 'bc': 
					if (!isOwner) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 PESAN BROADCAST 」*\n\nDari : Owner\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(4)}`})
						}
						reply('*SUCCESS BROADCAST* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST AINEBOT 」*\n\nDari : Owner\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(4)}`)
						}
						reply('*SUCCESS BROADCAST* ')
					}
			break
			case 'bcc': 
					if (!isAdmin) return reply('*Only Admin bot*')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 PESAN BROADCAST 」*\n\nDari : Wakil Owner\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(5)}`})
						}
						reply('*Suksess broadcast* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST AINEBOT 」*\n\nDari : Wakil Owner\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(5)}`)
						}
						reply('*Suksess broadcast* ')
					}
			break
			case 'bclimit': 
					if (!isOwner) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `Aine Memberikan Limit Kepada Pengguna Terdaftar Sebanyak : ${body.slice(9)}`})
						}
						reply('*Suksess broadcast* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `Aine Memberikan Limit Kepada Pengguna Terdaftar Sebanyak : ${body.slice(9)}`)
						}
						reply('*Suksess broadcast* ')
					}
			break
			case 'bcs': 
					if (!isAdmin) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `${body.slice(5)}`})
						}
						reply('*Suksess broadcast* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `${body.slice(5)}`)
						}
						reply('*Suksess broadcast* ')
					}
			break
			case 'clearall':
					if (!isOwner) return reply(ind.ownerb())
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid, "delete")
					}
					reply(ind.clears())
			break
			case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					prefix = args[0]
					reply(`Change Prefix To ${prefix} SUCCESS!`)
			break  
			case 'setmemlimit':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					if (isNaN(args[0])) return reply('limit harus angka')
					memberlimit = args[0]
					reply(`Change Member limit To ${memberlimit} SUCCESS!`)
			break
			case 'setlimit':
			case 'addlimit':
				if (args.length < 1) return
				if (!isOwner) return reply(ind.ownerb())
				if (isNaN(args[0])) return reply('limit harus angka')
				limitawal = args[0]
				reply(`*Limit berhasil di ubah menjadi* : ${limitawal}`)
			break
			case 'resetlimit':
				if (!isOwner) return reply(ind.ownerb())
				var obj = []
				fs.writeFileSync('./database/user/limit.json', JSON.stringify(obj, null, '\t'))
				reply(`LIMIT BERHASIL DI RESET`)
			break
			case 'bcgc':
				     if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await groupMembers
					nom = mek.participant
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 BC GROUP 」*\n\nDari Grup : ${groupName}\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BC GROUP 」*\n\nDari Grup : ${groupName}\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(6)}`)
						}
						reply('Sukses broadcast group')
					}
					break 
				case 'eval':
				if (!isOwner) return reply(ind.ownerb())
                if (!q) return reply(ind.wrongf())
                try {
         	           let evaled = await eval(q)
         	           if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
          	          await reply(evaled)
          		//	client.sendMessage(from, JSON.stringify(eval(body.slice(6))). text)
       	         } catch (err) {
        	            console.error(err)
          	          await reply('Error!')
  	   	       }
        	    break 
        		case 'listonline': 
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return  reply('Command ini tidak bisa digunakan di pribadi!\n\n*Harap gunakan di group!*')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
				let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
				client.sendMessage(from, 'List Online Grup:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,
				contextInfo: { mentionedJid: online }
				})
				await limitAdd(sender)
			break 
			case '=>':
				if (!isOwner) return reply(ind.ownerb())
				const cmd = body.slice(4)
				exec(cmd, (err, stdout) => {
					if (err) return client.sendMessage(from, `root@Nfz.01:~ ${err}`, text, { quoted: mek })
					if (stdout) {
						client.sendMessage(from, stdout, text)
					}
				})
			break
			//tools 
			case 'tomp3':
				client.updatePresence(from, Presence.composing)
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isQuotedVideo) return reply('Reply video untuk mengubah audio!')
				reply(ind.wait())
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.mp4')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return reply('Yahh emrror bruh:(')
					buffer = fs.readFileSync(ran)
					client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek })
					fs.unlinkSync(ran)
				})
				await limitAdd(sender)
			break 
			case 'tovideo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				if (!isQuotedSticker) return reply('Reply stickernya kak!')
				reply(ind.wait())
					anumedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					anum = await client.downloadAndSaveMediaMessage(anumedia)
					ran = getRandom('.webp')
					exec(`ffmpeg -i ${anum} ${ran}`, (err) => {
						fs.unlinkSync(anum)
						if (err) return reply(`Error: ${err}`)
						buffers = fs.readFileSync(ran)
						client.sendMessage(from, buffers, video, { quoted: mek, caption: 'DONE...' })
						fs.unlinkSync(ran)
					})
				await limitAdd(sender)
			break
			case 'slowmo':
			case 'slow':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.mp3')
				exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
				fs.unlinkSync(media)
				if (err) return reply('Error!')
				uhh = fs.readFileSync(ran)
				client.sendMessage(from, uhh, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
				fs.unlinkSync(ran)
				})
				await limitAdd(sender)
			break
			case 'tupai':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				await limitAdd(sender)
				break
				case 'gemok':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				await limitAdd(sender)
				break
				case 'bass':                 
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				await limitAdd(sender)
				break
				case 'getsticker':
			case 'gets':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
				namastc = body.slice(12)
				result = fs.readFileSync(`./strg/sticker/${namastc}.webp`)
				client.sendMessage(from, result, sticker, {quoted :mek})
				await limitAdd(sender)
			break
			case 'stickerlist':
			case 'liststicker':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					teks = '*Sticker List :*\n\n'
					for (let awokwkwk of setiker) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${setiker.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })
				await limitAdd(sender)
			break
		case 'addsticker':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (!isQuotedSticker) return reply('Reply stiker nya kak')
					svst = body.slice(12)
					if (!svst) return reply('Nama sticker nya apa kak?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					setiker.push(`${svst}`)
					fs.writeFileSync(`./strg/sticker/${svst}.webp`, delb)
					fs.writeFileSync(`./strg/stik.json`, JSON.stringify(setiker))
					client.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststicker`, MessageType.text, { quoted: mek })
				await limitAdd(sender)
		break
		case 'addvn':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (!isQuotedAudio) return reply('Reply vnnya kak!')
					svst = body.slice(7)
					if (!svst) return reply('Nama audionya apa kak?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					audionye.push(`${svst}`)
					fs.writeFileSync(`./strg/audio/${svst}.mp3`, delb)
					fs.writeFileSync('./strg/audio.json', JSON.stringify(audionye))
					client.sendMessage(from, `Sukses Menambahkan Vn\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: mek })
				await limitAdd(sender)
		break
		case 'getvn':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./strg/audio/${namastc}.mp3`)
					client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
				await limitAdd(sender)
		break
		case 'listvn':
		case 'vnlist':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					teks = '*List Vn:*\n\n'
					for (let awokwkwk of audionye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${audionye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })
				await limitAdd(sender)
		break
		case 'addimage':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (!isQuotedImage) return reply('Reply imagenya kak!')
					svst = body.slice(10)
					if (!svst) return reply('Nama imagenya apa kak?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					imagenye.push(`${svst}`)
					fs.writeFileSync(`./strg/image/${svst}.jpeg`, delb)
					fs.writeFileSync('./strg/image.json', JSON.stringify(imagenye))
					client.sendMessage(from, `Sukses Menambahkan Image\nCek dengan cara ${prefix}listimage`, MessageType.text, { quoted: mek })
				await limitAdd(sender)
		break
		case 'getimage':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/image/${namastc}.jpeg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: `Result From Database : ${namastc}.jpeg` })
				await limitAdd(sender)
			break
		case 'imagelist':
		case 'listimage':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					teks = '*List Image :*\n\n'
					for (let awokwkwk of imagenye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${imagenye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })
				await limitAdd(sender)
		break
		case 'addvideo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					if (!isQuotedVideo) return reply('Reply videonya kak!')
					svst = body.slice(10)
					if (!svst) return reply('Nama videonya apa kak?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					videonye.push(`${svst}`)
					fs.writeFileSync(`./strg/video/${svst}.mp4`, delb)
					fs.writeFileSync('./strg/video.json', JSON.stringify(videonye))
					client.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listvideo`, MessageType.text, { quoted: mek })
				await limitAdd(sender)
		break
		case 'getvideo':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/video/${namastc}.mp4`)
					client.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
				await limitAdd(sender)
		break
		case 'listvideo':
		case 'videolist':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isPremium) return reply('Maaf kamu bukan user premium!')
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
					teks = '*List Video :*\n\n'
					for (let awokwkwk of videonye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${videonye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })
				await limitAdd(sender)
		break
		case 'triggered':
		case 'ger':
				 if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				 ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
				 reply(ind.wait())
				 var imgbb = require('imgbb-uploader')
				         owgi = await client.downloadAndSaveMediaMessage(ger)
				         anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				         teks = `${anu.display_url}`
				         ranp = getRandom('.gif')
				         rano = getRandom('.webp')
				         anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
				         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
				         fs.unlinkSync(ranp)
				         if (err) return reply(imd.stikga())
				         nobg = fs.readFileSync(rano)
				         client.sendMessage(from, nobg, sticker, {quoted: mek})
				         fs.unlinkSync(rano)
				})
            			} else {
				reply('Gunakan foto!')
				}
				await limitAdd(sender)
		break
		case 'tourl':
				 if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				 ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
				 reply(ind.wait())
				 var imgbb = require('imgbb-uploader')
				 owgi = await client.downloadAndSaveMediaMessage(ger)
				 anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				 teks = `${anu.display_url}`
				 reply(teks)
				 }
				await limitAdd(sender)
		break
		case 'wasted':
		case 'was':
				if(!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				reply(ind.wait())
				var imgbb = require('imgbb-uploader')
				  owgi = await client.downloadAndSaveMediaMessage(ger)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  teks = `${anu.display_url}`
				  ranp = getRandom('.gif')
				  rano = getRandom('.webp')
				  anu1 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
				  exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
				fs.unlinkSync(ranp)
				if (err) return reply(ind.stikga())
				nobg = fs.readFileSync(rano)
				client.sendMessage(from, nobg, sticker, {
				  quoted: mek
				})
				fs.unlinkSync(rano)
				  })
				
				} else {
				  reply('Gunakan foto!')
				}
				await limitAdd(sender)
		break 
		case 'wanted':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(7)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${anu.display_url}&text1=Dicari&text2=${tels}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'gtav':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(7)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/gtavposter/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'facebookpage':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(14)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/facebookprof/?urlgbr=${anu.display_url}&text=${tels}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'costumwp':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(14)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/customwp/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'pantaimalam':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(14)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/nightbeach/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
				break
		case 'pencil':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(14)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/pencil/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'bakar':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(7)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/burneffect/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
		case 'crossgun':
				if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				var imgbb = require('imgbb-uploader')
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
				  reply(ind.wait())
				  owgi = await client.downloadAndSaveMediaMessage(ted)
				  tels = body.slice(7)
				  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
				  hehe = await getBuffer(`https://videfikri.com/api/textmaker/crossgun/?urlgbr=${anu.display_url}`)
				 client.sendMessage(from, hehe, image, {quoted:mek})
				} else {
				  reply('Jangan tambah kan apapun pada command')
				}
				await limitAdd(sender)
		break
				default:

				if (budy == '@chbhgh') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@loqupe') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnyee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnyee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnyee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnyee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@ripeqi') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captnee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@ceodgo') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captee = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: captee, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@bolune') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							capte = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: capte, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							capte = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: capte, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@cubacu') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							cubacus = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: cubacus, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							cubacus = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: cubacus, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
				if (budy == '@aine') {
				if (isRegistered) return  reply(ind.rediregis())
				if (isBanned) return reply('Maaf, aine telah membanned mu!\nHarap meningkatkan premium untuk terbebas banned selama anda premium!')
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							ainegoh = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: ainegoh, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							ainegoh = `${a}──「 DATA KAMU 」──${a}\n\n${a}Terima kasih sudah mendaftar, aine akan menyimpan data mu.${a}\n\n${a}Nama: ${pushname}${a}\n${a}Nomor:${a} wa.me/${sender.split("@")[0]}\n${a}Limit: 1000000${a}\n${a}User Terdaftar:${a} ✓\n${a}Waktu Pendaftaran: 2021/${time}${a}\n${a}NS: ${serialUser}${a}\n\n${a}Note:${a}\n${a}• Nomor NS adalah untuk melakukan transaksi pembayaran buylimit dan transfer uang.${a}\n${a}• Kami dari pihak developer aine, apapun yang anda lakukan dengan pencarian di aine, kami tidak akan bertanggung jawab hal itu!${a}`
							buffer = await getBuffer(ppimg)
							client.sendMessage(from, buffer, image, {
								caption: ainegoh, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
			if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Maaf *${pushname}*, Command *${prefix}${command}* Tidak Terdaftar Di Dalam *${prefix}menu*!`)
                  }
            if (/^>/.test(pes)) {
            	if (!isOwner) return
	            let txt = pes.replace(/^>/, '')
	            let type = Function
	            if (/await/.test(pes)) type = (async () => {}).constructor
	            let func = new type('print', 'client', 'MessageType', 'mek', 'text', 'from', 'image', 'os', 'fetch', txt)
	            console.log('[EvalF]', func.toString())
	            let output
	            try {
	                output = await func((...args) => {
	                    console.log('[EvalP]', ...args)
	                    client.sendMessage(from, util.format(...args), MessageType.extendedText, {
	                        quoted: mek
	                    })
	                }, client, MessageType, mek, text, from, await image, os, fetch)
	                console.log('[EvalO]', output)
	                client.sendMessage(from, util.format(output), MessageType.extendedText, {
	                    quoted: mek
	                })
	            } catch (e) {
	                console.error('[EvalE]', e)
	                client.sendMessage(from, util.format(e), MessageType.extendedText, {
	                    quoted: mek
	                })
	            }
            }
			if (isGroup && !isCmd && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}

        } catch (e) {
            e = String(e)
            if (!e.includes("this.isZero")) {
                const time_error = moment.tz('Asia/Jakarta').format('HH:mm:ss')
                console.log(color(time_error, "white"), color("[  ERROR  ]", "aqua"), color(e, 'red'))
            }
        }




