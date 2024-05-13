document.addEventListener('DOMContentLoaded', function () {
    async function cardHistory() {
        const historyContainer = document.getElementById('history-container');
        if (!historyContainer) return;
        const data = await fetchHistoryData();
        const html = data.map(item => `<div class="swiper-slide history_slide"><span class="history_slide_time">A.D.${item.year}</span><span class="history_slide_link">${item.title}</span></div>`).join('');
        const swiperContainer = document.querySelector('.history_swiper-container');
        document.getElementById('history_container_wrapper').innerHTML = html
        const swiperHistory = new Swiper(swiperContainer, {
            loop: true,
            direction: 'vertical',
            autoplay: {disableOnInteraction: true, delay: 5000},
            mousewheel: false,
        });
        historyContainer.onmouseenter = () => swiperHistory.autoplay.stop();
        historyContainer.onmouseleave = () => swiperHistory.autoplay.start();

        async function fetchHistoryData() {
            const myDate = new Date();
            const formattedDate = 'S' + `${myDate.getMonth() + 1}`.padStart(2, '0') + `${myDate.getDate()}`.padStart(2, '0');
            const historyDataUrl = `https://fastly.jsdelivr.net/gh/Zfour/Butterfly-card-history@2.08/baiduhistory/json/${myDate.getMonth() < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1}.json`;
            const response = await fetch(historyDataUrl);
            const data = await response.json();
            return data[formattedDate];
        }
    }
    cardHistory()
    document.addEventListener('pjax:complete', cardHistory);
})


