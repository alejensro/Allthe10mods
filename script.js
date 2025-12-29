document.addEventListener('DOMContentLoaded', () => {
    const serverIp = 'tnshyqui.ddns.net';
    const serverPort = 25565; // Default Minecraft port
    const apiUrl = `https://api.mcstatus.io/v2/status/java/${serverIp}:${serverPort}`;

    const statusText = document.getElementById('server-status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    const playerCount = document.getElementById('player-count');
    const versionInfo = document.getElementById('version-info');
    const statusContainer = document.getElementById('status-container');

    // Fetch Server Status
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            statusContainer.classList.remove('loading');

            if (data.online) {
                statusText.textContent = 'Online';
                statusIndicator.classList.add('status-online');
                playerCount.textContent = `Jugadores: ${data.players.online} / ${data.players.max}`;
                versionInfo.textContent = `Versión: ${data.version.name_clean || data.version.name}`;
            } else {
                statusText.textContent = 'Offline';
                statusIndicator.classList.add('status-offline');
                playerCount.textContent = 'Servidor apagado';
                versionInfo.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching status:', error);
            statusText.textContent = 'Error';
            statusIndicator.classList.add('status-offline');
        });

    // Copy IP
    const copyBtn = document.getElementById('copy-btn');
    const toast = document.getElementById('toast');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(serverIp).then(() => {
            showToast();
        });
    });

    function showToast() {
        toast.className = "toast show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
});
