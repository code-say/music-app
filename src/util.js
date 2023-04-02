import { v4 as uuidv4 } from "uuid";

function chillHop() {
    return [
        {
            name: "By Chance",
            artist: "SwuM",
            cover:
            "https://chillhop.com/wp-content/uploads/2021/03/74d62bc9370a68e440c1b98eaf650344f0a7faea-1024x1024.jpg",
            id: uuidv4(),
            active: true,
            audio: "https://mp3.chillhop.com/serve.php/?mp3=15224"
        },
        {
            name:"Cruising",
            artist: "Evil Needle",
            cover:
            "https://chillhop.com/wp-content/uploads/2021/04/cb0cc6270d7f2e1bb13e44e8832bd5c9b2a61080-1024x1024.jpg",
            id: uuidv4(),
            active: false,
            audio: "https://mp3.chillhop.com/serve.php/?mp3=17087"
        },
        {
            name:"Runaway",
            artist:"Blue Wednesday, Magnus Klausen",
            cover:
            "https://chillhop.com/wp-content/uploads/2020/09/5bff1a6f1bd0e2168d29b4c841b811598135e457-1024x1024.jpg",
            id: uuidv4(),
            active: true,
            audio: "https://mp3.chillhop.com/serve.php/?mp3=12134"
        },
        {
            name: "By Chance",
            artist: "SwuM",
            cover:
            "https://chillhop.com/wp-content/uploads/2021/03/74d62bc9370a68e440c1b98eaf650344f0a7faea-1024x1024.jpg",
            id: uuidv4(),
            active: true,
            audio: "https://mp3.chillhop.com/serve.php/?mp3=15224"
        }
    ];
}

export default chillHop;