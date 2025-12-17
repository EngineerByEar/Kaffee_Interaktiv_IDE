const btn_plantation = document.getElementById("Button_Kaffeebohne");
const btn_harvest = document.getElementById("Button_Zeit_Ernte");
const btn_bean_price = document.getElementById("Button_Preisentwicklung");
const btn_preprocessing_quality = document.getElementById("Button_Zeit_Qualität");
const btn_preprocessing_time = document.getElementById("Button_Zeit_Aufbreitung");
const btn_roast = document.getElementById("Button_Kaffeeröstung");
const btn_roast_time = document.getElementById("Button_Zeit_Röstung");
const btn_market = document.getElementById("Button_Marktanteile");

const btn_quellen = document.getElementById("quellen_button");

const background = document.getElementById("infographic");



//load buttons and popups from index.html
const btns = [btn_plantation, btn_harvest, btn_bean_price, btn_preprocessing_quality, btn_preprocessing_time, btn_roast, btn_roast_time, btn_market, btn_quellen]
const popups = document.querySelectorAll(".Popup");

window.addEventListener("load", ()=>{
    //create close buttons for popups and append them
    for(const popup of popups){
        const popup_close_btn = document.createElement("button");
        popup_close_btn.className = "close_btn";
        popup_close_btn.id = `${popup.id}_close_btn`;
        popup_close_btn.innerHTML = "&#10005;";
        //event listener to close the popup on click
        popup_close_btn.addEventListener("click", ()=>{
            popup_close_btn.parentElement.style.display = "none";
            background.classList.remove("blurred");
        })

        popup.appendChild(popup_close_btn);
    }
    //wiggle animation
    for (const btn of btns){
        console.log(`wiggle on ${btn.id}`)
        btn.classList.add("wiggle");
    }
})

//open popup function
function open_popup(popup_name){
    const popup = document.getElementById(popup_name);
    popup.style.display = "flex";
    //blur background
    background.classList.add("blurred");
}

//open correct popup on button click
btn_plantation.addEventListener("click", function(){
    console.log("plantation");
    open_popup("plantation");
})

btn_harvest.addEventListener("click", function(){
    console.log("harvest");
    open_popup("harvest");
})

btn_bean_price.addEventListener("click", function(){
    console.log("bean_price");
    open_popup("bean_price");
})

btn_preprocessing_quality.addEventListener("click", function(){
    console.log("preprocessing_quality");
    open_popup("preprocessing_quality");
})

btn_preprocessing_time.addEventListener("click", function(){
    console.log("preprocessing_time");
    open_popup("preprocessing_time");
})

btn_roast.addEventListener("click", function(){
    console.log("roast");
    open_popup("roast");
})

btn_roast_time.addEventListener("click", function(){
    console.log("roast_time");
    open_popup("roast_time");
})

btn_market.addEventListener("click", function(){
    console.log("market");
    open_popup("market");
})

btn_quellen.addEventListener("click", ()=>{
    console.log("quellen");
    open_popup("quellen");
})

//Animationen




  document.addEventListener("DOMContentLoaded", function() {
    
    // --- НАСТРОЙКИ ---
    const sunID = "Ellipse 20"; 
    const radius = 200;          
    const speed = 0.002;       
    
    // 1. Уменьшили размах (было 0.6, ставим 0.35 для "1/3 полукруга")
    const swayAmount = 0.35;      

    // 2. Добавили сдвиг вправо (в пикселях)
    const shiftX = 60;     
    const shiftY = -20;        
    // -----------------

    const sun = document.getElementById(sunID);
    
    if (!sun) {
      console.log("Элемент не найден!");
      return;
    }

    function animate() {
      const time = Date.now() * speed;
      
      // Вычисляем угол наклона (маятник)
      const currentAngle = Math.sin(time) * swayAmount;

      // Считаем X.
      // Math.sin(currentAngle) * radius — это движение по дуге.
      // + shiftX — это постоянный сдвиг вправо.
      const offsetX = (Math.sin(currentAngle) * radius) + shiftX;
      
      // Считаем Y (чтобы была дуга, а не прямая линия)
      // Если дуга выгнута не туда, поставьте минус перед скобкой: -(1 - Math.cos...
      const offsetY = (1 - Math.cos(currentAngle)) * radius + shiftY; 

      // Применяем
      sun.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

      requestAnimationFrame(animate);
    }

    animate();
  });




  document.addEventListener("DOMContentLoaded", function() {
    
    // --- НАСТРОЙКИ ---
    const speed = 0.002; // Общая скорость для всего
    
    // Деревья
    const treeIDs = ["Union_14", "Union_15", "Union_16"];
    const treeMaxGrowth = 1.1; // Деревья вырастают на 10%
    
    // Кокосы (Эллипсы)
    const coconutIDs = [
        "Ellipse 8", "Ellipse 9", "Ellipse 10", 
        "Ellipse 11", "Ellipse 12", "Ellipse 13", "Ellipse 14"
    ];
    // -----------------

    const svgNS = "http://www.w3.org/2000/svg";
    const treeElements = [];
    const coconutWrappers = [];

    // 1. ПОДГОТОВКА ДЕРЕВЬЕВ
    treeIDs.forEach(function(id) {
        const el = document.getElementById(id);
        if (el) {
            el.style.transformBox = "fill-box";
            el.style.transformOrigin = "bottom center"; // Растут снизу вверх
            treeElements.push(el);
        }
    });

    // 2. ПОДГОТОВКА КОКОСОВ (Создаем обертки)
    coconutIDs.forEach(function(id) {
        const originalElement = document.getElementById(id);
        if (originalElement && originalElement.parentNode) {
            // Создаем группу
            const wrapperGroup = document.createElementNS(svgNS, "g");
            wrapperGroup.id = "wrapper_for_" + id;

            // Вставляем группу и переносим туда эллипс
            originalElement.parentNode.insertBefore(wrapperGroup, originalElement);
            wrapperGroup.appendChild(originalElement);

            // Настраиваем точку роста (из центра)
            wrapperGroup.style.transformBox = "fill-box";
            wrapperGroup.style.transformOrigin = "center";

            coconutWrappers.push(wrapperGroup);
        }
    });

    // 3. ОБЩИЙ ЦИКЛ АНИМАЦИИ
    function animate() {
      const time = Date.now() * speed;
      
      // ГЛАВНЫЙ РИТМ (Sync Factor)
      // Создаем волну, которая плавно ходит от 0 до 1 и обратно
      // (Math.sin идет от -1 до 1. Мы прибавляем 1 и делим на 2, чтобы получить 0...1)
      const syncFactor = (Math.sin(time) + 1) / 2;

      // Анимация Деревьев
      // Когда фактор 0 -> масштаб 1. Когда фактор 1 -> масштаб 1.1
      const currentTreeScale = 1 + (syncFactor * (treeMaxGrowth - 1));
      treeElements.forEach(function(el) {
          el.style.transform = `scale(${currentTreeScale})`;
      });

      // Анимация Кокосов
      // Когда фактор 0 -> масштаб 0 (не видно). Когда фактор 1 -> масштаб 1 (видно)
      const currentCocoScale = syncFactor; 
      coconutWrappers.forEach(function(wrapper) {
          wrapper.style.transform = `scale(${currentCocoScale})`;
      });

      requestAnimationFrame(animate);
    }

    // Запуск
    animate();
  });



  document.addEventListener("DOMContentLoaded", function() {
    
    // --- НАСТРОЙКИ ---
    const handsID = "Vector 66";    // ID стрелок
    const centerID = "Ellipse 55";  // ID центральной точки
    // -----------------

    const hands = document.getElementById(handsID);
    const centerDot = document.getElementById(centerID);
    
    if (!hands || !centerDot) {
      console.log("Элементы часов не найдены!");
      return;
    }

    // Получаем координаты центра
    const cx = centerDot.getAttribute("cx");
    const cy = centerDot.getAttribute("cy");

    function animateClock() {
      // 1. Получаем текущее время
      const now = new Date();
      const seconds = now.getSeconds();

      // 2. Считаем угол для "тиканья"
      // В круге 360 градусов, в минуте 60 секунд.
      // 360 / 60 = 6 градусов на одну секунду.
      const tickAngle = seconds * 6;

      // 3. Вращаем
      // Стрелка прыгнет в новую позицию и будет стоять там, 
      // пока не сменится секунда в системном времени.
      hands.setAttribute("transform", `rotate(${tickAngle}, ${cx}, ${cy})`);

      requestAnimationFrame(animateClock);
    }

    // Запуск
    animateClock();
  });



  document.addEventListener("DOMContentLoaded", function() {
    
    console.log("--- ЗАПУСК СИНХРОННОЙ АНИМАЦИИ (ТЕЛО + РУКИ) ---");

    // 1. ОБЩИЙ СПИСОК ВСЕХ ЭЛЕМЕНТОВ
    // Теперь они все в одной лодке и будут плыть синхронно
    const idsToMove = [
        "Vector 69", "Vector 68", "Vector 79","Vector 72", "Vector 74","Vector 77", "Vector 73","Vector 70","Vector 71",// Кисти
        "Vector 75", "Vector 76",              // Рукава
        "Vector 78", "Vector 80",              // Пальцы
        "Vector 88_2"                          // Тело (Главный элемент)
    ]; 
    
    // 2. ОБЩИЕ НАСТРОЙКИ (чтобы ритм был одинаковый)
    const speed = 0.0025;   // Скорость (взял из вашего второго скрипта)
    const rangeX = 3;       // Размах влево-вправо
    const rangeY = 1.5;     // Размах вверх-вниз
    // -----------------

    const svgNS = "http://www.w3.org/2000/svg";
    const groupsToAnimate = [];

    // 3. СОЗДАЕМ ОБЕРТКИ (Wrapper) ДЛЯ КАЖДОГО ЭЛЕМЕНТА
    idsToMove.forEach(function(id) {
        const el = document.getElementById(id);
        
        if (el) {
            // Если элемент уже обернут (защита от дублей), берем существующую обертку
            if (el.parentNode.id.startsWith("wrapper_")) {
                 groupsToAnimate.push(el.parentNode);
                 return;
            }

            // Создаем новую группу-обертку
            const wrapper = document.createElementNS(svgNS, "g");
            wrapper.id = "wrapper_" + id;

            // Вставляем обертку перед элементом
            el.parentNode.insertBefore(wrapper, el);
            // Переносим элемент внутрь
            wrapper.appendChild(el);
            
            // Если это тело, убираем синюю обводку (если она была в стилях)
            if (id === "Vector 88_2") {
                el.style.stroke = "none";
            }

            // Добавляем в список анимации
            groupsToAnimate.push(wrapper);
            console.log("✅ Готов к анимации: " + id);
            
        } else {
            console.error("❌ Не найден ID: " + id);
        }
    });

    // 4. ЕДИНЫЙ ЦИКЛ АНИМАЦИИ
    function animate() {
      const time = Date.now() * speed;
      
      // Вычисляем координаты ОДИН РАЗ для всех -> полная синхронизация
      const x = Math.sin(time) * rangeX;
      const y = Math.cos(time * 2) * rangeY; 

      const transformString = `translate3d(${x}px, ${y}px, 0)`;

      // Применяем ко всем оберткам
      groupsToAnimate.forEach(function(g) {
          g.style.transform = transformString;
      });

      requestAnimationFrame(animate);
    }

    // Запуск
    if (groupsToAnimate.length > 0) {
        animate();
    }
  });





  document.addEventListener("DOMContentLoaded", function() {
    
    console.log("--- ЗАПУСК МЕДЛЕННОЙ АНИМАЦИИ ГРАФИКА ---");

    // 1. НАСТРОЙКИ
    const chartIDs = ["Vector_10", "Vector_11"]; 
    
    // БЫЛО: 0.002 -> СТАЛО: 0.0008 (Значительно медленнее)
    const speed = 0.0008; 

    const svgNS = "http://www.w3.org/2000/svg";
    const chartGroups = [];

    // 2. ПОДГОТОВКА
    chartIDs.forEach(function(id) {
        const el = document.getElementById(id);
        
        if (el) {
            if (!el.parentNode.id.startsWith("wrapper_chart_")) {
                const wrapper = document.createElementNS(svgNS, "g");
                wrapper.id = "wrapper_chart_" + id;
                
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);

                // Точка роста: Снизу вверх
                wrapper.style.transformBox = "fill-box";
                wrapper.style.transformOrigin = "bottom center";

                chartGroups.push(wrapper);
            } else {
                 chartGroups.push(el.parentNode);
            }
        } else {
            console.error("❌ Элемент графика не найден: " + id);
        }
    });

    // 3. АНИМАЦИЯ
    function animateChart() {
      const time = Date.now() * speed;

      // Плавная волна от 0 до 1
      const scaleY = (Math.sin(time) + 1) / 2;

      // Применяем масштаб
      chartGroups.forEach(function(g) {
          g.style.transform = `scale(1, ${scaleY.toFixed(3)})`;
      });

      requestAnimationFrame(animateChart);
    }

    if (chartGroups.length > 0) {
        animateChart();
    }
  });





  document.addEventListener("DOMContentLoaded", function() {
    
    console.log("--- ЗАПУСК ЖОНГЛИРОВАНИЯ (ПОДНЯТОГО ВЫШЕ) ---");

    // 1. СПИСКИ ЭЛЕМЕНТОВ
    const targetIDs = [];
    for (let i = 11; i <= 15; i++) targetIDs.push("Ellipse 49_" + i);
    for (let i = 11; i <= 15; i++) targetIDs.push("Vector 62_" + i);

    // 2. НАСТРОЙКИ
    const speed = 0.005;        
    const rotationSpeed = 0.2;  
    const rangeX = 15.0;   
    const rangeY = 25.0;   
    
    // СМЕЩЕНИЕ ВВЕРХ
    // Было -12, поставил -25. Чем больше минус, тем выше они взлетают.
    const verticalOffset = -25; 

    const svgNS = "http://www.w3.org/2000/svg";
    const animatedItems = [];

    // 3. ПОДГОТОВКА (Обертки)
    targetIDs.forEach(function(id, index) {
        const el = document.getElementById(id);
        if (el) {
            let wrapper = el.parentNode;
            if (!wrapper.id.startsWith("wrapper_funnel_")) {
                wrapper = document.createElementNS(svgNS, "g");
                wrapper.id = "wrapper_funnel_" + id;
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
                wrapper.style.transformBox = "fill-box";
                wrapper.style.transformOrigin = "center";
            }
            animatedItems.push({ group: wrapper, order: index % 5 });
        }
    });

    // 4. АНИМАЦИЯ
    function animateFunnel() {
      const moveTime = Date.now() * speed;
      const rotateTime = Date.now() * rotationSpeed;

      animatedItems.forEach(function(item) {
          const waveOffset = item.order * 0.8; 

          const x = Math.cos(moveTime + waveOffset) * rangeX;
          let y = Math.sin(moveTime + waveOffset) * rangeY;
          
          // Применяем смещение вверх
          y += verticalOffset; 

          const rotationAngle = (rotateTime + item.order * 45) % 360;

          item.group.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotationAngle.toFixed(1)}deg)`;
      });

      requestAnimationFrame(animateFunnel);
    }

    if (animatedItems.length > 0) {
        animateFunnel();
    }
  });




  document.addEventListener("DOMContentLoaded", function() {
    
    console.log("--- ЗАПУСК АНИМАЦИИ ТОЛЬКО ОДНОГО ЗЕРНА (63) ---");

    // НАСТРОЙКИ
    const heroID = "Ellipse 63"; // Только это зерно
    
    const speed = 0.003; // Скорость подъема
    
    // КООРДИНАТЫ ПОЛЕТА (Настраиваем направление)
    // X = 40 (Вправо на 40px)
    // Y = -50 (Вверх на 50px - минус в SVG означает вверх)
    const moveX = 40; 
    const moveY = -10; 

    const svgNS = "http://www.w3.org/2000/svg";
    let wrapper = null;

    // 1. НАХОДИМ И ПОДГОТАВЛИВАЕМ ЗЕРНО 63
    const el = document.getElementById(heroID);

    if (el) {
        wrapper = el.parentNode;
        
        // Создаем обертку для безопасного движения
        if (!wrapper.id.startsWith("wrapper_bean_hero")) {
            wrapper = document.createElementNS(svgNS, "g");
            wrapper.id = "wrapper_bean_hero_" + heroID;
            
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
            
            // Чтобы зерно крутилось вокруг своего центра
            wrapper.style.transformBox = "fill-box";
            wrapper.style.transformOrigin = "center";
        }
    } else {
        console.error("Зерно " + heroID + " не найдено!");
    }

    // 2. АНИМАЦИЯ
    function animateHeroBean() {
      const time = Date.now() * speed;

      if (wrapper) {
          // Движение от 0 до 1 и обратно (синусоида)
          // 0 = зерно на столе
          // 1 = зерно в верхней точке (у руки)
          let factor = (Math.sin(time) + 1) / 2; 
          
          // Делаем движение чуть более резким при подъеме (имитация руки)
          // Можно убрать Math.pow, если хотите обычную плавность
          factor = Math.pow(factor, 2); // Плавный старт, резкий верх

          const x = factor * moveX;
          const y = factor * moveY;
          
          // Немного вращаем, пока оно летит
          const rot = factor * 180; 

          wrapper.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(1)}deg)`;
      }

      requestAnimationFrame(animateHeroBean);
    }

    // Запуск
    if (wrapper) {
        animateHeroBean();
    }
  });
