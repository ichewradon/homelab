async function updateStats() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(
            'https://homelabstats.purpledogprints.co.uk/stats',
            { signal: controller.signal }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        const local = data.local ?? {};
        const remote = data.remote ?? {};

        document.getElementById('dash-temp').textContent =
            local.temp != null ? local.temp.toFixed(1) : '--';

        document.getElementById('dash-uptime').textContent =
            local.uptime != null ? formatUptime(local.uptime) : '--';

        document.getElementById('node-temp').textContent =
            remote.temp != null ? remote.temp.toFixed(1) : '--';

        document.getElementById('node-uptime').textContent =
            remote.uptime != null ? formatUptime(remote.uptime) : '--';

        const temps = [local.temp, remote.temp].filter(t => t != null);
        document.getElementById('homelab-temp').textContent =
            temps.length ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : '--';

        const uptimes = [local.uptime, remote.uptime].filter(u => u != null);
        document.getElementById('homelab-uptime').textContent =
            uptimes.length ? formatUptime(Math.max(...uptimes)) : '--';

    } catch (err) {
        console.error('Failed to fetch stats:', err);

        [
            'dash-temp',
            'dash-uptime',
            'node-temp',
            'node-uptime',
            'homelab-temp',
            'homelab-uptime'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '--';
        });
    } finally {
        clearTimeout(timeout);
    }
}

function formatUptime(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d} d ${h} h ${m} m`;
}

updateStats();
setInterval(updateStats, 5000);
