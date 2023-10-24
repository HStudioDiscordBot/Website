const version = document.getElementById('mainVersion');
const loader = document.getElementById('loader');

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function preloadAssets(assetsToPreload) {
    for (const asset of assetsToPreload) {
        const preloadElement = document.createElement('link');
        preloadElement.rel = 'preload';
        preloadElement.as = asset.endsWith('.css') ? 'style' : 'script';
        preloadElement.href = asset;
        document.head.appendChild(preloadElement);
    }
}

function mainInvite() {
    var width = 600;
    var height = 800;
    var left = (window.innerWidth - width) / 2;
    var top = (window.innerHeight - height) / 2;
    var features = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;

    var popup = window.open('/invite.html', "Invite", features);

    if (popup) {
        popup.focus();
    }
}

function mainDiscordSupport() {
    window.open('https://discord.gg/bVm6XAukta', "_blank");
}

function mainDocs() {
    location.href = '/docs.html';
}

async function mainLoad() {
    const prelaodimg = [
        "/image/HStudio.png",
        "/image/HStudio/1.png",
    ];

    preloadAssets(prelaodimg);

    const loadScreen = document.getElementById('loadScreen');
    const loader = document.getElementById('loader');
    loadScreen.style.display = 'none';
    loader.style.display = 'none';

}

async function statusLoad() {
    const status = await fetchStatus();

    await updateStatus(status);

    const loadScreen = document.getElementById('loadScreen');
    const loader = document.getElementById('loader');
    loadScreen.style.display = 'none';
    loader.style.display = 'none';
}

function inviteLoad() {
    const divBotList = document.getElementById('botlist');

    const BotInfo = [
        {
            id: 0,
            name: "HStudio",
            img: "/image/HStudio.png",
            inviteUrl: "https://discord.com/oauth2/authorize?client_id=1105873690022924450&scope=bot%20applications.commands&permissions=36825160",
        },
        {
            id: 1,
            name: "HStudio (1)",
            img: "/image/HStudio/1.png",
            inviteUrl: "https://discord.com/oauth2/authorize?client_id=1140130682094497823&scope=bot%20applications.commands&permissions=36825160",
        }
    ];

    const prelaodimg = [
        "/image/HStudio.png",
        "/image/HStudio/1.png",
    ];

    preloadAssets(prelaodimg);

    const inviteBotList = document.createElement('div');

    inviteBotList.className = "inviteBotList";

    BotInfo.forEach(info => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const btn = document.createElement('button');

        img.src = info.img;
        img.className = "mainImage w-50 cropCircle";

        h2.innerText = info.name;

        btn.innerText = `เชิญ ${info.name}`
        btn.className = "navMainBtn w-auto";
        btn.onclick = () => {
            location.href = info.inviteUrl;
        };

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(btn);

        inviteBotList.appendChild(div)
    });

    divBotList.appendChild(inviteBotList);

    loader.remove();
}

function docsLoad() {
    const docsBody = document.getElementById('docsBody');

    // script.js

    const toggleButton = document.querySelector('.toggle-button');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    toggleButton.addEventListener('click', () => {

        sidebar.style.left = '0';
        content.style.marginLeft = '250px';
        loadScreen.style.display = 'none';

    });

    loadScreen.addEventListener('click', () => {
        sidebar.style.left = '0';
        content.style.marginLeft = '250px';
        loadScreen.style.display = 'none';
    });

    const loadScreen = document.getElementById('loadScreen');
    const loader = document.getElementById('loader');
    loadScreen.style.display = 'none';
    loader.style.display = 'none';
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}

async function reloadStatus() {
    const loadScreen = document.getElementById('loadScreen');
    const loader = document.getElementById('loader');

    loadScreen.style.display = 'flex';
    loader.style.display = 'flex';

    const status = await fetchStatus();

    await updateStatus(status);

    loadScreen.style.display = 'none';
    loader.style.display = 'none';
}

async function updateStatus(status) {
    const statusHeader = document.getElementById('statusHeader');
    const statusData0 = document.getElementById('statusData0');
    const statusData1 = document.getElementById('statusData1');


    if (statusHeader && statusData0, statusData1) {
        const statusCpuLoad = document.getElementById('statusCpuLoad');
        const statusRamUsed = document.getElementById('statusRamUsed');

        // Update Status Header
        statusCpuLoad.innerText = `${status.server.cpu}%`
        statusRamUsed.innerText = `${formatBytes(status.server.ram)}`

        // Clear Old Status
        statusData0.innerHTML = '';
        statusData1.innerHTML = '';

        if (status.hstudio[0].shards) {
            // Update Status 0
            status.hstudio[0].shards.forEach(shard => {
                const card = document.createElement('div');
                const shardID = document.createElement('p');
                const shardStatus = document.createElement('p');

                card.className = 'card m-2 p-4 text-center w-25';
                shardID.className = 'genText';
                shardID.innerText = `Shard: ${shard.id}`;
                if (shard.online) {
                    shardStatus.className = 'onlineText';
                    shardStatus.innerText = 'ออนไลน์';
                } else {
                    shardStatus.className = 'offlineText';
                    shardStatus.innerText = 'ออฟไลน์';
                }

                card.appendChild(shardID);
                card.appendChild(shardStatus);

                statusData0.appendChild(card);
            });
        } else if (status.hstudio[0].error) {
            const card = document.createElement('div');
            const shardID = document.createElement('p');
            const shardStatus = document.createElement('p');

            card.className = 'card m-2 p-4 text-center w-25';
            shardID.className = 'genText';
            shardID.innerText = `Shard: all`;

            shardStatus.className = 'offlineText';
            shardStatus.innerText = 'ออฟไลน์';

            card.appendChild(shardID);
            card.appendChild(shardStatus);

            statusData0.appendChild(card);
        }

        if (status.hstudio[1].shards) {
            // Update Status 1
            status.hstudio[1].shards.forEach(shard => {
                const card = document.createElement('div');
                const shardID = document.createElement('p');
                const shardStatus = document.createElement('p');

                card.className = 'card m-2 p-4 text-center w-25';
                shardID.className = 'genText';
                shardID.innerText = `Shard: ${shard.id}`;
                if (shard.online) {
                    shardStatus.className = 'onlineText';
                    shardStatus.innerText = 'ออนไลน์';
                } else {
                    shardStatus.className = 'offlineText';
                    shardStatus.innerText = 'ออฟไลน์';
                }

                card.appendChild(shardID);
                card.appendChild(shardStatus);

                statusData1.appendChild(card);
            });
        } else if (status.hstudio[1].error) {
            const card = document.createElement('div');
            const shardID = document.createElement('p');
            const shardStatus = document.createElement('p');

            card.className = 'card m-2 p-4 text-center w-25';
            shardID.className = 'genText';
            shardID.innerText = `Shard: all`;

            shardStatus.className = 'offlineText';
            shardStatus.innerText = 'ออฟไลน์';

            card.appendChild(shardID);
            card.appendChild(shardStatus);

            statusData0.appendChild(card);
        }

    }
}

async function fetchStatus() {
    try {
        const response = await fetch("https://api.hewkawar.xyz/app/hstudio/info");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

function formatBytes(bytes) {
    const kb = 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;

    if (bytes < kb) {
        return bytes + ' B';
    } else if (bytes < mb) {
        return (bytes / kb).toFixed(2) + ' KB';
    } else if (bytes < gb) {
        return (bytes / mb).toFixed(2) + ' MB';
    } else {
        return (bytes / gb).toFixed(2) + ' GB';
    }
}

if (version) {
    let versionRaw = getCookie('version');

    if (!versionRaw) {
        fetch("https://api.hewkawar.xyz/app/hstudio/info")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);

                document.cookie = `version=${data.hstudio[0].version}; expires=${expirationDate.toUTCString()}; path=/`;
                version.innerHTML = `(เวอร์ชั่น ${data.hstudio[0].version})`;
            })
            .catch(error => {
                version.innerHTML = "Can't Load Version";
                console.error(error.message);
            });
    } else {
        version.innerHTML = `(เวอร์ชั่น ${versionRaw})`;
    }
}