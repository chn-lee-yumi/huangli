// 获取当前日期
function getCurrentDate() {
    const solar = Solar.fromDate(new Date());
    return solar.toYmd();
}

// 更新显示
function updateDisplay(date) {
    // 使用 Solar 创建阳历对象
    const solar = Solar.fromDate(date);
    // 使用 Lunar.js 创建农历对象
    const lunar = solar.getLunar();
    
    const solarWeek = SolarWeek.fromDate(date, 0); // 以星期一作为一周的起点
    
    // 获取阳历信息
    const solarDate = solar.toYmdHms() + ' 星期' + solar.getWeekInChinese() + ' 第' + solarWeek.getIndexInYear() + '周';
    
    // 获取节日和星座信息
    const festivals = solar.getFestivals();
    const lunarFestivals = lunar.getFestivals();
    const xingZuo = solar.getXingZuo();
    
    
    // 获取农历信息
    const lunarDate = `${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}`;
    
    // 获取节气
    const solarTerm = lunar.getJieQi();
    
    // 获取干支
    const yearGanZhi = lunar.getYearInGanZhi();
    const monthGanZhi = lunar.getMonthInGanZhi();
    const dayGanZhi = lunar.getDayInGanZhi();
    const timeGanZhi = lunar.getTimeInGanZhi();
    
    // 获取冲煞信息
    const dayChong = lunar.getDayChongDesc();
    const daySha = lunar.getDaySha();
    const timeChong = lunar.getTimeChongDesc();
    const timeSha = lunar.getTimeSha();
    
    // 获取禄
    const lu = lunar.getDayLu();
    
    // 获取物候
    const wuHou = lunar.getWuHou();
    
    // 获取彭祖百忌
    const pengZu = lunar.getPengZuGan() + " " + lunar.getPengZuZhi();
    
    // 获取今日八字
    const baZi = lunar.getEightChar();
    
    // 获取每日宜忌
    const dayYi = lunar.getDayYi();
    const dayJi = lunar.getDayJi();
    
    // 获取吉神凶煞
    const dayJiShen = lunar.getDayJiShen();
    const dayXiongSha = lunar.getDayXiongSha();
    
    // 获取佛历信息
    const foto = Foto.fromLunar(lunar);
    const fotoDate = foto;
    const fotoFestivals = foto.getFestivals().map(f => f.toFullString());
    const fotoOtherFestivals = foto.getOtherFestivals();
    
    // 获取道历信息
    const tao = Tao.fromLunar(lunar);
    const taoDate = tao.toFullString();
    const taoFestivals = tao.getFestivals();
    
    // 更新显示
    document.getElementById('solarDate').textContent = solarDate;
    document.getElementById('lunarDate').textContent = lunarDate;
    document.getElementById('solarTerm').textContent = solarTerm || '无';
    
    // 更新节日和星座
    document.getElementById('solarFestivals').textContent = festivals.length > 0 ? festivals.join('、') : '无';
    document.getElementById('lunarFestivals').textContent = lunarFestivals.length > 0 ? lunarFestivals.join('、') : '无';
    document.getElementById('xingZuo').textContent = xingZuo;
    
    // 更新干支
    document.getElementById('yearGanZhi').textContent = yearGanZhi;
    document.getElementById('monthGanZhi').textContent = monthGanZhi;
    document.getElementById('dayGanZhi').textContent = dayGanZhi;
    document.getElementById('timeGanZhi').textContent = timeGanZhi;
    
    // 更新冲煞信息
    document.getElementById('dayChong').textContent = dayChong;
    document.getElementById('daySha').textContent = daySha;
    document.getElementById('timeChong').textContent = timeChong;
    document.getElementById('timeSha').textContent = timeSha;
    
    // 更新禄和物候
    document.getElementById('lu').textContent = lu;
    document.getElementById('wuHou').textContent = wuHou;
    
    // 更新彭祖百忌
    document.getElementById('pengZu').textContent = pengZu;
    
    // 更新今日八字
    document.getElementById('baZi').textContent = baZi;
    
    // 更新每日宜忌
    document.getElementById('dayYi').textContent = dayYi.join('、');
    document.getElementById('dayJi').textContent = dayJi.join('、');
    
    // 更新吉神凶煞
    document.getElementById('dayJiShen').textContent = dayJiShen.join('、');
    document.getElementById('dayXiongSha').textContent = dayXiongSha.join('、');
    
    // 更新佛历信息
    document.getElementById('fotoDate').textContent = fotoDate;
    document.getElementById('fotoFestivals').textContent = fotoFestivals.length > 0 ? fotoFestivals.join('、') : '无';
    document.getElementById('fotoOtherFestivals').textContent = fotoOtherFestivals.length > 0 ? fotoOtherFestivals.join('、') : '无';
    
    // 更新道历信息
    document.getElementById('taoDate').textContent = taoDate;
    document.getElementById('taoFestivals').textContent = taoFestivals.length > 0 ? taoFestivals.join('、') : '无';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('dateInput');
    const todayBtn = document.getElementById('todayBtn');
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    
    // 设置当前日期
    const today = new Date();
    dateInput.value = getCurrentDate();
    updateDisplay(today);
    
    // 自动更新定时器
    let updateTimer = null;
    
    // 开始自动更新
    function startAutoUpdate() {
        if (updateTimer) return;
        updateTimer = setInterval(() => {
            const now = new Date();
            updateDisplay(now);
            dateInput.value = getCurrentDate();
        }, 1000);
    }
    
    // 停止自动更新
    function stopAutoUpdate() {
        if (updateTimer) {
            clearInterval(updateTimer);
            updateTimer = null;
        }
    }
    
    // 开始自动更新
    startAutoUpdate();
    
    // 日期选择事件
    dateInput.addEventListener('change', (e) => {
        stopAutoUpdate();
        const selectedDate = new Date(e.target.value);
        updateDisplay(selectedDate);
    });
    
    // 今日按钮事件
    todayBtn.addEventListener('click', () => {
        const today = new Date();
        dateInput.value = getCurrentDate();
        updateDisplay(today);
        startAutoUpdate();
    });
    
    // 前一天按钮事件
    prevDayBtn.addEventListener('click', () => {
        stopAutoUpdate();
        const currentDate = new Date(dateInput.value);
        currentDate.setDate(currentDate.getDate() - 1);
        dateInput.value = currentDate.toISOString().split('T')[0];
        updateDisplay(currentDate);
    });
    
    // 后一天按钮事件
    nextDayBtn.addEventListener('click', () => {
        stopAutoUpdate();
        const currentDate = new Date(dateInput.value);
        currentDate.setDate(currentDate.getDate() + 1);
        dateInput.value = currentDate.toISOString().split('T')[0];
        updateDisplay(currentDate);
    });
}); 