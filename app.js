// Global state
let state = {
    carouselCount: 5,
    selectedTemplate: 0,
    mainImage: null,
    bgImage: null,
    bgImageOpacity: 1,
    carousels: [],
    mainContent: {
        title: '',
        subtitle: '',
        titleFont: 'Montserrat',
        subtitleFont: 'Montserrat',
        titleSize: 72,
        subtitleSize: 36,
        titleBold: false,
        titleItalic: false,
        titleColor: '#FFFFFF',
        subtitleColor: '#FFFFFF',
        titleShadow: true,
        titleBgColor: '',
        separator: 'none'
    }
};

// Separator/Border definitions
const separators = [
    { name: 'Yok', value: 'none' },
    { name: 'İnce Çizgi', value: 'line-thin' },
    { name: 'Kalın Çizgi', value: 'line-thick' },
    { name: 'Çift Çizgi', value: 'line-double' },
    { name: 'Noktalı', value: 'line-dotted' },
    { name: 'Kesikli', value: 'line-dashed' },
    { name: 'Gradient Çizgi', value: 'line-gradient' },
    { name: 'Minimal Kutu', value: 'box-minimal' },
    { name: 'Yuvarlak Kutu', value: 'box-rounded' },
    { name: 'Gölgeli Kutu', value: 'box-shadow' },
    { name: 'Dekoratif', value: 'decorative' }
];

// Template definitions
const templates = [
    {
        name: 'Klasik Merkez',
        titleStyle: { top: '35%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' },
        subtitleStyle: { top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }
    },
    {
        name: 'Sol Üst Modern',
        titleStyle: { top: '15%', left: '10%', textAlign: 'left', width: '70%' },
        subtitleStyle: { top: '35%', left: '10%', textAlign: 'left', width: '70%' }
    },
    {
        name: 'Sağ Alt Minimal',
        titleStyle: { bottom: '20%', right: '10%', textAlign: 'right', width: '60%' },
        subtitleStyle: { bottom: '10%', right: '10%', textAlign: 'right', width: '60%' }
    },
    {
        name: 'Üst Merkez Şık',
        titleStyle: { top: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '90%' },
        subtitleStyle: { top: '25%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '85%' }
    },
    {
        name: 'Alt Merkez Zarif',
        titleStyle: { bottom: '25%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '85%' },
        subtitleStyle: { bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '80%' }
    },
    {
        name: 'Sol Dikey',
        titleStyle: { top: '40%', left: '5%', transform: 'translateY(-50%)', textAlign: 'left', width: '50%' },
        subtitleStyle: { top: '60%', left: '5%', textAlign: 'left', width: '50%' }
    },
    {
        name: 'Sağ Dikey',
        titleStyle: { top: '40%', right: '5%', transform: 'translateY(-50%)', textAlign: 'right', width: '50%' },
        subtitleStyle: { top: '60%', right: '5%', textAlign: 'right', width: '50%' }
    },
    {
        name: 'Diyagonal Sol',
        titleStyle: { top: '20%', left: '5%', textAlign: 'left', width: '65%' },
        subtitleStyle: { top: '50%', left: '15%', textAlign: 'left', width: '60%' }
    },
    {
        name: 'Diyagonal Sağ',
        titleStyle: { top: '20%', right: '5%', textAlign: 'right', width: '65%' },
        subtitleStyle: { top: '50%', right: '15%', textAlign: 'right', width: '60%' }
    },
    {
        name: 'Bölünmüş Ekran',
        titleStyle: { top: '50%', left: '25%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%' },
        subtitleStyle: { top: '50%', left: '75%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%' }
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplateGrid();
    setupDragAndDrop();
    updateBgSizeInfo();

    // Load font options into select elements first
    const mainTitleFontSelect = document.getElementById('mainTitleFont');
    const mainSubtitleFontSelect = document.getElementById('mainSubtitleFont');
    if (mainTitleFontSelect) mainTitleFontSelect.innerHTML = getFontOptions('Montserrat');
    if (mainSubtitleFontSelect) mainSubtitleFontSelect.innerHTML = getFontOptions('Montserrat');

    // Create custom font dropdowns for main screen
    createCustomFontDropdown('mainTitleFont', 'Montserrat');
    createCustomFontDropdown('mainSubtitleFont', 'Montserrat');

    // Opacity slider update for main image
    const opacitySlider = document.getElementById('mainImageOpacity');
    const opacityValue = document.getElementById('mainImageOpacityValue');
    if (opacitySlider && opacityValue) {
        opacitySlider.addEventListener('input', (e) => {
            opacityValue.textContent = e.target.value + '%';
        });
    }

    // Opacity slider update for background image
    const bgOpacitySlider = document.getElementById('bgImageOpacity');
    const bgOpacityValue = document.getElementById('bgImageOpacityValue');
    if (bgOpacitySlider && bgOpacityValue) {
        bgOpacitySlider.addEventListener('input', (e) => {
            bgOpacityValue.textContent = e.target.value + '%';
        });
    }

    // Glass opacity slider
    const glassOpacitySlider = document.getElementById('mainGlassOpacity');
    const glassOpacityValue = document.getElementById('mainGlassOpacityValue');
    if (glassOpacitySlider && glassOpacityValue) {
        glassOpacitySlider.addEventListener('input', (e) => {
            glassOpacityValue.textContent = e.target.value + '%';
        });
    }
});

// Step Navigation
function goToStep1() {
    showStep('step1');
}

function goToStep2() {
    state.carouselCount = parseInt(document.getElementById('carouselCount').value);
    updateBgSizeInfo();
    showStep('step2');
}

function goToStep3() {
    if (state.selectedTemplate === null) {
        alert('Lütfen bir şablon seçin!');
        return;
    }
    showStep('step3');
}

function goToStep4() {
    // Save main content
    state.mainContent = {
        title: document.getElementById('mainTitle').value,
        subtitle: document.getElementById('mainSubtitle').value,
        titleFont: document.getElementById('mainTitleFont').value,
        subtitleFont: document.getElementById('mainSubtitleFont').value,
        titleWeight: document.getElementById('mainTitleWeight').value,
        subtitleWeight: document.getElementById('mainSubtitleWeight').value,
        titleSize: parseInt(document.getElementById('mainTitleSize').value),
        subtitleSize: parseInt(document.getElementById('mainSubtitleSize').value),
        titleBold: document.getElementById('mainTitleBold').checked,
        titleItalic: document.getElementById('mainTitleItalic').checked,
        titleColor: document.getElementById('mainTitleColor').value,
        subtitleColor: document.getElementById('mainSubtitleColor').value,
        titleShadow: document.getElementById('mainTitleShadow').checked,
        titleBgColor: document.getElementById('mainTitleBgColor').value,
        separator: document.getElementById('mainSeparator').value,
        separatorColor: document.getElementById('mainSeparatorColor').value,
        textAlign: document.getElementById('mainTextAlign').value,
        imageOpacity: parseInt(document.getElementById('mainImageOpacity').value) / 100,
        lineHeight: parseFloat(document.getElementById('mainLineHeight').value),
        textIndent: parseInt(document.getElementById('mainTextIndent').value),
        effect3D: document.getElementById('main3DEffect').value,
        gradient: document.getElementById('mainGradient').value,
        glass: document.getElementById('mainGlass').value,
        glassColor: document.getElementById('mainGlassColor').value,
        glassOpacity: parseInt(document.getElementById('mainGlassOpacity').value) / 100,
        glassBorderRadius: parseInt(document.getElementById('mainGlassBorderRadius').value),
        pageDots: document.getElementById('mainPageDots').checked,
        swipeIndicator: document.getElementById('mainSwipeIndicator').checked,
        swipeColor: document.getElementById('mainSwipeColor').value,
        swipeSize: document.getElementById('mainSwipeSize').value,
        swipeStyle: document.getElementById('mainSwipeStyle').value
    };

    if (!state.mainImage) {
        alert('Lütfen ana ekran görseli yükleyin!');
        return;
    }

    createCarouselForms();
    showStep('step4');
}

function goToStep5() {
    // Save carousel contents - preserve existing customBg if exists
    const newCarousels = [];
    for (let i = 0; i < state.carouselCount; i++) {
        const existingCarousel = state.carousels[i] || {};

        newCarousels.push({
            title: document.getElementById(`carousel${i}Title`).value,
            content: document.getElementById(`carousel${i}Content`).value,
            titleFont: document.getElementById(`carousel${i}TitleFont`).value,
            contentFont: document.getElementById(`carousel${i}ContentFont`).value,
            titleWeight: document.getElementById(`carousel${i}TitleWeight`).value,
            contentWeight: document.getElementById(`carousel${i}ContentWeight`).value,
            titleSize: parseInt(document.getElementById(`carousel${i}TitleSize`).value),
            contentSize: parseInt(document.getElementById(`carousel${i}ContentSize`).value),
            titleBold: document.getElementById(`carousel${i}TitleBold`).checked,
            titleItalic: document.getElementById(`carousel${i}TitleItalic`).checked,
            titleColor: document.getElementById(`carousel${i}TitleColor`).value,
            contentColor: document.getElementById(`carousel${i}ContentColor`).value,
            titleShadow: document.getElementById(`carousel${i}TitleShadow`).checked,
            titleBgColor: document.getElementById(`carousel${i}TitleBgColor`).value,
            separator: document.getElementById(`carousel${i}Separator`).value,
            separatorColor: document.getElementById(`carousel${i}SeparatorColor`).value,
            textAlign: document.getElementById(`carousel${i}TextAlign`).value,
            lineHeight: parseFloat(document.getElementById(`carousel${i}LineHeight`).value),
            textIndent: parseInt(document.getElementById(`carousel${i}TextIndent`).value),
            effect3D: document.getElementById(`carousel${i}3DEffect`).value,
            gradient: document.getElementById(`carousel${i}Gradient`).value,
            glass: document.getElementById(`carousel${i}Glass`).value,
            glassColor: document.getElementById(`carousel${i}GlassColor`).value,
            glassOpacity: parseInt(document.getElementById(`carousel${i}GlassOpacity`).value) / 100,
            glassBorderRadius: parseInt(document.getElementById(`carousel${i}GlassBorderRadius`).value),
            pageDots: document.getElementById(`carousel${i}PageDots`).checked,
            swipeIndicator: document.getElementById(`carousel${i}SwipeIndicator`).checked,
            swipeColor: document.getElementById(`carousel${i}SwipeColor`).value,
            swipeSize: document.getElementById(`carousel${i}SwipeSize`).value,
            swipeStyle: document.getElementById(`carousel${i}SwipeStyle`).value,
            customBgOpacity: parseInt(document.getElementById(`carousel${i}CustomBgOpacity`).value) / 100,
            template: parseInt(document.getElementById(`carousel${i}Template`).value),
            // PRESERVE customBg from existing state
            customBg: existingCarousel.customBg
        });
    }
    state.carousels = newCarousels;
    showStep('step5');
}

function editCarousel(carouselIndex) {
    // Navigate back to Step 4
    showStep('step4');

    // Scroll to the specific carousel form
    setTimeout(() => {
        const targetForm = document.querySelector(`#carousel${carouselIndex}Form`);
        if (targetForm) {
            targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Add a brief highlight effect to show which carousel is being edited
            targetForm.style.transition = 'box-shadow 0.3s';
            targetForm.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.5)';
            setTimeout(() => {
                targetForm.style.boxShadow = '';
            }, 2000);
        }
    }, 100);
}

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
}

// Template Grid
function initializeTemplateGrid() {
    const grid = document.getElementById('templateGrid');
    templates.forEach((template, index) => {
        const card = document.createElement('div');
        card.className = 'template-card';
        if (index === 0) {
            card.classList.add('selected');
            state.selectedTemplate = 0;
        }

        card.innerHTML = `
            <div class="template-preview">
                <div class="preview-title" style="${getStyleString(template.titleStyle, 24)}">
                    Başlık
                </div>
                <div class="preview-subtitle" style="${getStyleString(template.subtitleStyle, 14)}">
                    Alt başlık metni
                </div>
            </div>
            <div class="template-name">${template.name}</div>
        `;

        card.onclick = () => selectTemplate(index);
        grid.appendChild(card);
    });
}

function getStyleString(style, fontSize) {
    let str = `font-size: ${fontSize}px; position: absolute;`;
    for (let key in style) {
        if (key === 'width') {
            str += ` ${key}: ${style[key]};`;
        } else {
            str += ` ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${style[key]};`;
        }
    }
    return str;
}

function selectTemplate(index) {
    document.querySelectorAll('.template-card').forEach((card, i) => {
        if (i === index) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    state.selectedTemplate = index;
}

// Create mini template selector for carousels
function createMiniTemplateSelector(carouselIndex) {
    const container = document.createElement('div');
    container.className = 'mini-template-grid';

    templates.forEach((template, index) => {
        const mini = document.createElement('div');
        mini.className = 'mini-template';
        mini.title = template.name;
        if (carouselIndex === 0 && index === state.selectedTemplate) {
            mini.classList.add('selected');
        } else if (carouselIndex > 0 && state.carousels[carouselIndex]?.template === index) {
            mini.classList.add('selected');
        } else if (carouselIndex > 0 && !state.carousels[carouselIndex] && state.carousels[0]?.template === index) {
            mini.classList.add('selected');
        } else if (carouselIndex > 0 && !state.carousels[carouselIndex] && !state.carousels[0] && index === state.selectedTemplate) {
            mini.classList.add('selected');
        }

        mini.innerHTML = `
            <div class="mini-preview">
                <div class="mini-title" style="${getStyleString(template.titleStyle, 6)}"></div>
                <div class="mini-subtitle" style="${getStyleString(template.subtitleStyle, 3)}"></div>
            </div>
        `;

        mini.onclick = () => {
            container.querySelectorAll('.mini-template').forEach(m => m.classList.remove('selected'));
            mini.classList.add('selected');
            document.getElementById(`carousel${carouselIndex}Template`).value = index;
        };

        container.appendChild(mini);
    });

    return container;
}

// Drag and Drop
function setupDragAndDrop() {
    setupDropZone('mainImageDrop', 'mainImage', 'mainImagePreview', (file) => {
        state.mainImage = file;
    });

    setupDropZone('bgImageDrop', 'bgImage', 'bgImagePreview', (file) => {
        state.bgImage = file;
    });
}

function setupDropZone(dropZoneId, inputId, previewId, callback) {
    const dropZone = document.getElementById(dropZoneId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    dropZone.onclick = () => input.click();

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file, preview, callback);
        }
    });

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file, preview, callback);
        }
    });
}

function handleImageFile(file, previewElement, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewElement.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button class="remove-image-btn" onclick="removeImage('${previewElement.id}', event)">×</button>
        `;
        previewElement.classList.add('active');
        callback(file);
    };
    reader.readAsDataURL(file);
}

// Remove image function
function removeImage(previewId, event) {
    if (event) event.preventDefault();

    const preview = document.getElementById(previewId);
    if (!preview) return;

    preview.innerHTML = '';
    preview.classList.remove('active');

    // Clear state based on preview ID
    if (previewId === 'mainImagePreview') {
        state.mainImage = null;
        document.getElementById('mainImage').value = '';
    } else if (previewId === 'bgImagePreview') {
        state.bgImage = null;
        document.getElementById('bgImage').value = '';
    } else if (previewId.includes('carousel') && previewId.includes('BgPreview')) {
        // Extract carousel index from ID like "carousel0BgPreview"
        const match = previewId.match(/carousel(\d+)BgPreview/);
        if (match) {
            const index = parseInt(match[1]);
            if (state.carousels[index]) {
                state.carousels[index].customBg = null;
            }
            const inputId = `carousel${index}CustomBg`;
            const input = document.getElementById(inputId);
            if (input) input.value = '';
        }
    }
}

// Font List Data
function getFontList() {
    return [
        // Art Deco & Lüks Serif
        { name: 'Bodoni Moda', category: '🎭 Art Deco' },
        { name: 'Cinzel', category: '🎭 Art Deco' },
        { name: 'Forum', category: '🎭 Art Deco' },
        { name: 'Julius Sans One', category: '🎭 Art Deco' },
        { name: 'Marcellus', category: '🎭 Art Deco' },
        { name: 'Poiret One', category: '🎭 Art Deco' },
        { name: 'Tenor Sans', category: '🎭 Art Deco' },

        // Editorial & Dergi Serif
        { name: 'Playfair Display', category: '📰 Editorial Serif' },
        { name: 'EB Garamond', category: '📰 Editorial Serif' },
        { name: 'Spectral', category: '📰 Editorial Serif' },
        { name: 'Libre Caslon Text', category: '📰 Editorial Serif' },
        { name: 'Cardo', category: '📰 Editorial Serif' },
        { name: 'Alegreya', category: '📰 Editorial Serif' },
        { name: 'Cormorant Garamond', category: '📰 Editorial Serif' },
        { name: 'Crimson Text', category: '📰 Editorial Serif' },
        { name: 'Libre Baskerville', category: '📰 Editorial Serif' },
        { name: 'Merriweather', category: '📰 Editorial Serif' },

        // Modern Serif - Bold
        { name: 'Abril Fatface', category: '💎 Modern Serif' },
        { name: 'Yeseva One', category: '💎 Modern Serif' },

        // Modern Geometric & Trendy
        { name: 'Unbounded', category: '🔮 Modern Geometric' },
        { name: 'Outfit', category: '🔮 Modern Geometric' },
        { name: 'Urbanist', category: '🔮 Modern Geometric' },
        { name: 'Lexend', category: '🔮 Modern Geometric' },
        { name: 'Space Grotesk', category: '🔮 Modern Geometric' },

        // Sans-Serif Modern - Temiz & Minimal
        { name: 'Inter', category: '✨ Sans Modern' },
        { name: 'Montserrat', category: '✨ Sans Modern' },
        { name: 'Poppins', category: '✨ Sans Modern' },
        { name: 'Raleway', category: '✨ Sans Modern' },
        { name: 'Josefin Sans', category: '✨ Sans Modern' },
        { name: 'Work Sans', category: '✨ Sans Modern' },
        { name: 'Rubik', category: '✨ Sans Modern' },
        { name: 'DM Sans', category: '✨ Sans Modern' },
        { name: 'Plus Jakarta Sans', category: '✨ Sans Modern' },
        { name: 'Manrope', category: '✨ Sans Modern' },
        { name: 'Sora', category: '✨ Sans Modern' },
        { name: 'Epilogue', category: '✨ Sans Modern' },

        // Sans-Serif Klasik - Güvenilir
        { name: 'Roboto', category: '🔲 Sans Klasik' },
        { name: 'Lato', category: '🔲 Sans Klasik' },
        { name: 'Open Sans', category: '🔲 Sans Klasik' },
        { name: 'Source Sans 3', category: '🔲 Sans Klasik' },
        { name: 'Barlow', category: '🔲 Sans Klasik' },

        // Display & Impact - Çarpıcı
        { name: 'Bebas Neue', category: '🎯 Display' },
        { name: 'Oswald', category: '🎯 Display' },
        { name: 'Righteous', category: '🎯 Display' },
        { name: 'Archivo Black', category: '🎯 Display' },
        { name: 'Anton', category: '🎯 Display' },
        { name: 'Fjalla One', category: '🎯 Display' },
        { name: 'Questrial', category: '🎯 Display' },

        // El Yazısı & Dekoratif - Yaratıcı
        { name: 'Dancing Script', category: '✍️ El Yazısı' },
        { name: 'Pacifico', category: '✍️ El Yazısı' },
        { name: 'Great Vibes', category: '✍️ El Yazısı' },
        { name: 'Satisfy', category: '✍️ El Yazısı' },
        { name: 'Caveat', category: '✍️ El Yazısı' },
        { name: 'Indie Flower', category: '✍️ El Yazısı' },
        { name: 'Permanent Marker', category: '✍️ El Yazısı' },
        { name: 'Amatic SC', category: '✍️ El Yazısı' },
        { name: 'Lobster', category: '✍️ El Yazısı' }
    ];
}

// Create Custom Font Dropdown with Live Preview
function createCustomFontDropdown(selectId, defaultFont = 'Montserrat') {
    const originalSelect = document.getElementById(selectId);
    if (!originalSelect) return;

    const fonts = getFontList();

    // Create container
    const container = document.createElement('div');
    container.className = 'font-dropdown-container';
    container.id = `${selectId}_custom`;

    // Create selected display
    const selected = document.createElement('div');
    selected.className = 'font-dropdown-selected';
    selected.style.fontFamily = `'${defaultFont}', sans-serif`;
    selected.textContent = defaultFont;
    selected.setAttribute('tabindex', '0');

    // Create dropdown list
    const list = document.createElement('div');
    list.className = 'font-dropdown-list';

    let currentCategory = '';
    let focusedIndex = -1;
    const items = [];

    fonts.forEach((font, index) => {
        // Add category header
        if (font.category !== currentCategory) {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'font-dropdown-category';
            categoryHeader.textContent = font.category;
            list.appendChild(categoryHeader);
            currentCategory = font.category;
        }

        // Add font item
        const item = document.createElement('div');
        item.className = 'font-dropdown-item';
        item.style.fontFamily = `'${font.name}', sans-serif`;
        item.textContent = font.name;
        item.dataset.value = font.name;
        item.dataset.index = index;

        if (font.name === defaultFont) {
            item.classList.add('selected');
            focusedIndex = index;
        }

        item.addEventListener('click', () => {
            selectFont(font.name);
        });

        list.appendChild(item);
        items.push(item);
    });

    // Toggle dropdown
    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = list.classList.contains('open');

        // Close all other dropdowns
        document.querySelectorAll('.font-dropdown-list.open').forEach(l => l.classList.remove('open'));
        document.querySelectorAll('.font-dropdown-selected.open').forEach(s => s.classList.remove('open'));

        if (!isOpen) {
            list.classList.add('open');
            selected.classList.add('open');

            // Scroll to selected item
            const selectedItem = list.querySelector('.font-dropdown-item.selected');
            if (selectedItem) {
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
        }
    });

    // Keyboard navigation
    selected.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selected.click();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!list.classList.contains('open')) {
                selected.click();
            } else {
                navigateList(e.key === 'ArrowDown' ? 1 : -1);
            }
        } else if (e.key === 'Escape') {
            list.classList.remove('open');
            selected.classList.remove('open');
        }
    });

    function navigateList(direction) {
        items.forEach(item => item.classList.remove('focused'));

        focusedIndex += direction;
        if (focusedIndex < 0) focusedIndex = items.length - 1;
        if (focusedIndex >= items.length) focusedIndex = 0;

        const focusedItem = items[focusedIndex];
        focusedItem.classList.add('focused');
        focusedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

        // Live preview while navigating
        const fontName = focusedItem.dataset.value;
        selected.style.fontFamily = `'${fontName}', sans-serif`;
        selected.textContent = fontName;
    }

    function selectFont(fontName) {
        // Update UI
        selected.style.fontFamily = `'${fontName}', sans-serif`;
        selected.textContent = fontName;

        // Update all items
        items.forEach(item => {
            if (item.dataset.value === fontName) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // Update hidden select
        originalSelect.value = fontName;

        // Trigger change event on both select and container
        const event = new Event('change', { bubbles: true });
        originalSelect.dispatchEvent(event);
        container.dispatchEvent(event);

        // Close dropdown
        list.classList.remove('open');
        selected.classList.remove('open');
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            list.classList.remove('open');
            selected.classList.remove('open');
        }
    });

    container.appendChild(selected);
    container.appendChild(list);

    // Replace original select
    originalSelect.parentNode.insertBefore(container, originalSelect);
    originalSelect.style.display = 'none';

    return container;
}

// Legacy function for compatibility
function getFontOptions(selectedFont = 'Montserrat') {
    const fonts = getFontList();
    let currentCategory = '';
    let html = '';

    fonts.forEach(font => {
        if (font.category !== currentCategory) {
            if (currentCategory !== '') html += '</optgroup>';
            html += `<optgroup label="${font.category}">`;
            currentCategory = font.category;
        }
        html += `<option value="${font.name}" ${font.name === selectedFont ? 'selected' : ''}>${font.name}</option>`;
    });

    return html + '</optgroup>';
}

// Separator Options HTML
function getSeparatorOptions(selected = 'none') {
    return separators.map(sep =>
        `<option value="${sep.value}" ${sep.value === selected ? 'selected' : ''}>${sep.name}</option>`
    ).join('');
}

// Font Weight Options HTML
function getFontWeightOptions(selected = '400') {
    const weights = [
        { value: '100', label: 'Thin (100)' },
        { value: '200', label: 'Extra Light (200)' },
        { value: '300', label: 'Light (300)' },
        { value: '400', label: 'Regular (400)' },
        { value: '500', label: 'Medium (500)' },
        { value: '600', label: 'Semi Bold (600)' },
        { value: '700', label: 'Bold (700)' },
        { value: '800', label: 'Extra Bold (800)' },
        { value: '900', label: 'Black (900)' }
    ];
    return weights.map(w =>
        `<option value="${w.value}" ${w.value === selected ? 'selected' : ''}>${w.label}</option>`
    ).join('');
}

// Carousel Forms
function createCarouselForms() {
    const container = document.getElementById('carouselForms');
    container.innerHTML = '';

    // Get default values from first carousel or main content
    const defaultValues = state.carousels[0] || {
        titleFont: state.mainContent.titleFont,
        contentFont: state.mainContent.subtitleFont,
        titleWeight: state.mainContent.titleWeight || '700',
        contentWeight: state.mainContent.subtitleWeight || '400',
        titleSize: 48,
        contentSize: 28,
        titleBold: state.mainContent.titleBold,
        titleItalic: state.mainContent.titleItalic,
        titleColor: state.mainContent.titleColor,
        contentColor: state.mainContent.subtitleColor,
        titleShadow: state.mainContent.titleShadow,
        titleBgColor: state.mainContent.titleBgColor,
        separator: state.mainContent.separator,
        separatorColor: state.mainContent.separatorColor || '#FFFFFF',
        textAlign: state.mainContent.textAlign || 'default',
        lineHeight: state.mainContent.lineHeight || 1.2,
        textIndent: state.mainContent.textIndent || 0,
        effect3D: state.mainContent.effect3D || 'none',
        gradient: state.mainContent.gradient || 'none',
        glass: state.mainContent.glass || 'none',
        pageDots: state.mainContent.pageDots || false,
        swipeIndicator: state.mainContent.swipeIndicator || false,
        template: state.selectedTemplate
    };

    for (let i = 0; i < state.carouselCount; i++) {
        const carousel = state.carousels[i] || defaultValues;
        const form = document.createElement('div');
        form.className = 'carousel-form';
        form.innerHTML = `
            <h3>Carousel ${i + 1}</h3>

            <div class="form-group">
                <label>Başlık</label>
                <textarea id="carousel${i}Title" placeholder="Başlık giriniz (Enter ile yeni satır)" rows="2">${carousel.title || ''}</textarea>
                <small style="color: #666; font-size: 12px; display: block; margin-top: 5px;">
                    📝 **bold** *italik* ==vurgu== __altçizgi__ ++2:büyük++ --0.5:küçük++
                </small>
            </div>

            <div class="form-group">
                <label>İçerik</label>
                <textarea id="carousel${i}Content" placeholder="İçerik giriniz" rows="4">${carousel.content || ''}</textarea>
                <small style="color: #666; font-size: 12px; display: block; margin-top: 5px;">
                    📝 **bold** *italik* ==vurgu== __altçizgi__ ++2:büyük++ --0.5:küçük++
                </small>
            </div>

            <div class="form-group">
                <label>Özel Arka Plan (Opsiyonel)</label>
                <div class="drop-zone" id="carousel${i}BgDrop" style="padding: 20px; margin-bottom: 10px;">
                    <p>Resmi buraya sürükleyin veya tıklayın</p>
                    <input type="file" id="carousel${i}CustomBg" accept="image/*" style="display:none">
                </div>
                <div id="carousel${i}BgPreview" class="image-preview"></div>
            </div>

            <div class="form-group">
                <label>Özel Arka Plan Opaklığı (0-100%)</label>
                <input type="range" id="carousel${i}CustomBgOpacity" min="0" max="100" value="100" style="width: 100%;">
                <span id="carousel${i}CustomBgOpacityValue">100%</span>
            </div>

            <div class="text-controls">
                <div class="form-group">
                    <label>Başlık Font</label>
                    <select id="carousel${i}TitleFont" class="font-preview">
                        ${getFontOptions(carousel.titleFont)}
                    </select>
                </div>

                <div class="form-group">
                    <label>İçerik Font</label>
                    <select id="carousel${i}ContentFont" class="font-preview">
                        ${getFontOptions(carousel.contentFont)}
                    </select>
                </div>

                <div class="form-group">
                    <label>Başlık Font Ağırlığı</label>
                    <select id="carousel${i}TitleWeight">
                        ${getFontWeightOptions(carousel.titleWeight || '700')}
                    </select>
                </div>

                <div class="form-group">
                    <label>İçerik Font Ağırlığı</label>
                    <select id="carousel${i}ContentWeight">
                        ${getFontWeightOptions(carousel.contentWeight || '400')}
                    </select>
                </div>

                <div class="form-group">
                    <label>Başlık Boyutu</label>
                    <input type="number" id="carousel${i}TitleSize" value="${carousel.titleSize}" min="20" max="120">
                </div>

                <div class="form-group">
                    <label>İçerik Boyutu</label>
                    <input type="number" id="carousel${i}ContentSize" value="${carousel.contentSize}" min="16" max="80">
                </div>

                <div class="form-group">
                    <label>Başlık Rengi</label>
                    <input type="color" id="carousel${i}TitleColor" value="${carousel.titleColor || '#FFFFFF'}">
                </div>

                <div class="form-group">
                    <label>İçerik Rengi</label>
                    <input type="color" id="carousel${i}ContentColor" value="${carousel.contentColor || '#FFFFFF'}">
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="carousel${i}TitleBold" ${carousel.titleBold ? 'checked' : ''}> Başlık Bold
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="carousel${i}TitleItalic" ${carousel.titleItalic ? 'checked' : ''}> Başlık İtalik
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="carousel${i}TitleShadow" ${carousel.titleShadow !== false ? 'checked' : ''}> Yazı Gölgesi
                    </label>
                </div>

                <div class="form-group">
                    <label>Başlık Arka Plan Rengi (opsiyonel)</label>
                    <input type="color" id="carousel${i}TitleBgColor" value="${carousel.titleBgColor || '#000000'}">
                    <small>Kullanmak için renk seçin</small>
                </div>

                <div class="form-group">
                    <label>Ayırıcı/Çerçeve</label>
                    <select id="carousel${i}Separator">
                        ${getSeparatorOptions(carousel.separator)}
                    </select>
                </div>

                <div class="form-group">
                    <label>Ayırıcı/Çerçeve Rengi</label>
                    <input type="color" id="carousel${i}SeparatorColor" value="${carousel.separatorColor || '#FFFFFF'}">
                </div>

                <div class="form-group">
                    <label>Metin Hizalama</label>
                    <select id="carousel${i}TextAlign">
                        <option value="default" ${(carousel.textAlign || 'default') === 'default' ? 'selected' : ''}>Şablon Varsayılanı</option>
                        <option value="left" ${carousel.textAlign === 'left' ? 'selected' : ''}>Sola Yaslı</option>
                        <option value="center" ${carousel.textAlign === 'center' ? 'selected' : ''}>Ortalı</option>
                        <option value="right" ${carousel.textAlign === 'right' ? 'selected' : ''}>Sağa Yaslı</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Paragraf Aralığı (Satır Yüksekliği)</label>
                    <input type="number" id="carousel${i}LineHeight" value="${carousel.lineHeight || 1.2}" min="1" max="3" step="0.1">
                </div>

                <div class="form-group">
                    <label>Paragraf Girinti (px)</label>
                    <input type="number" id="carousel${i}TextIndent" value="${carousel.textIndent || 0}" min="0" max="100" step="5">
                </div>

                <div class="form-group">
                    <label>3D Yazı Efekti</label>
                    <select id="carousel${i}3DEffect">
                        <option value="none" ${(carousel.effect3D || 'none') === 'none' ? 'selected' : ''}>Yok</option>
                        <option value="depth" ${carousel.effect3D === 'depth' ? 'selected' : ''}>Derinlik</option>
                        <option value="pop" ${carousel.effect3D === 'pop' ? 'selected' : ''}>Pop-out</option>
                        <option value="layers" ${carousel.effect3D === 'layers' ? 'selected' : ''}>Katmanlı</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Gradient Yazı</label>
                    <select id="carousel${i}Gradient">
                        <option value="none" ${(carousel.gradient || 'none') === 'none' ? 'selected' : ''}>Yok</option>
                        <option value="sunset" ${carousel.gradient === 'sunset' ? 'selected' : ''}>Sunset</option>
                        <option value="ocean" ${carousel.gradient === 'ocean' ? 'selected' : ''}>Ocean</option>
                        <option value="fire" ${carousel.gradient === 'fire' ? 'selected' : ''}>Fire</option>
                        <option value="purple" ${carousel.gradient === 'purple' ? 'selected' : ''}>Purple Dream</option>
                        <option value="rainbow" ${carousel.gradient === 'rainbow' ? 'selected' : ''}>Rainbow</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Glassmorphism Kutu</label>
                    <select id="carousel${i}Glass">
                        <option value="none" ${(carousel.glass || 'none') === 'none' ? 'selected' : ''}>Yok</option>
                        <option value="light" ${carousel.glass === 'light' ? 'selected' : ''}>Açık</option>
                        <option value="dark" ${carousel.glass === 'dark' ? 'selected' : ''}>Koyu</option>
                        <option value="frosted" ${carousel.glass === 'frosted' ? 'selected' : ''}>Buzlu</option>
                        <option value="custom" ${carousel.glass === 'custom' ? 'selected' : ''}>Özel</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Glass Kutu Rengi</label>
                    <input type="color" id="carousel${i}GlassColor" value="${carousel.glassColor || '#FFFFFF'}">
                </div>

                <div class="form-group">
                    <label>Glass Kutu Opaklık (0-100%)</label>
                    <input type="range" id="carousel${i}GlassOpacity" min="0" max="100" value="${(carousel.glassOpacity || 0.2) * 100}" style="width: 100%;">
                    <span id="carousel${i}GlassOpacityValue">${((carousel.glassOpacity || 0.2) * 100).toFixed(0)}%</span>
                </div>

                <div class="form-group">
                    <label>Glass Kutu Kenar Yumuşatma (px)</label>
                    <input type="number" id="carousel${i}GlassBorderRadius" min="0" max="100" value="${carousel.glassBorderRadius || 20}" step="5">
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="carousel${i}PageDots" ${carousel.pageDots ? 'checked' : ''}> Sayfa Noktaları Göster
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="carousel${i}SwipeIndicator" ${carousel.swipeIndicator ? 'checked' : ''}> Kaydırma İşareti Göster
                    </label>
                </div>

                <div class="form-group">
                    <label>Kaydırma Ok Rengi</label>
                    <input type="color" id="carousel${i}SwipeColor" value="${carousel.swipeColor || '#FFFFFF'}">
                </div>

                <div class="form-group">
                    <label>Kaydırma Ok Boyutu</label>
                    <select id="carousel${i}SwipeSize">
                        <option value="small" ${(carousel.swipeSize || 'medium') === 'small' ? 'selected' : ''}>Küçük</option>
                        <option value="medium" ${(carousel.swipeSize || 'medium') === 'medium' ? 'selected' : ''}>Orta</option>
                        <option value="large" ${(carousel.swipeSize || 'medium') === 'large' ? 'selected' : ''}>Büyük</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Kaydırma Ok Şekli</label>
                    <select id="carousel${i}SwipeStyle">
                        <option value="arrow" ${(carousel.swipeStyle || 'arrow') === 'arrow' ? 'selected' : ''}>Ok</option>
                        <option value="chevron" ${carousel.swipeStyle === 'chevron' ? 'selected' : ''}>Chevron</option>
                        <option value="line" ${carousel.swipeStyle === 'line' ? 'selected' : ''}>Çizgi</option>
                        <option value="circle" ${carousel.swipeStyle === 'circle' ? 'selected' : ''}>Daire Ok</option>
                    </select>
                </div>
            </div>

            <input type="hidden" id="carousel${i}Template" value="${carousel.template !== undefined ? carousel.template : state.selectedTemplate}">

            <div class="form-group">
                <label>Yerleşim Seçimi</label>
                <div id="carousel${i}TemplateSelector"></div>
            </div>
        `;

        container.appendChild(form);

        // Add mini template selector
        const selector = createMiniTemplateSelector(i);
        document.getElementById(`carousel${i}TemplateSelector`).appendChild(selector);

        // Setup drop zone for custom background
        setupDropZone(`carousel${i}BgDrop`, `carousel${i}CustomBg`, `carousel${i}BgPreview`, (file) => {
            if (!state.carousels[i]) state.carousels[i] = {};
            state.carousels[i].customBg = file;
        });

        // If customBg already exists, show preview
        if (carousel.customBg) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById(`carousel${i}BgPreview`);
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    preview.classList.add('active');
                }
            };
            reader.readAsDataURL(carousel.customBg);
        }

        // Setup opacity sliders
        const customBgOpacitySlider = document.getElementById(`carousel${i}CustomBgOpacity`);
        const customBgOpacityValue = document.getElementById(`carousel${i}CustomBgOpacityValue`);
        if (customBgOpacitySlider && customBgOpacityValue) {
            customBgOpacitySlider.addEventListener('input', (e) => {
                customBgOpacityValue.textContent = e.target.value + '%';
            });
        }

        const glassOpacitySlider = document.getElementById(`carousel${i}GlassOpacity`);
        const glassOpacityValue = document.getElementById(`carousel${i}GlassOpacityValue`);
        if (glassOpacitySlider && glassOpacityValue) {
            glassOpacitySlider.addEventListener('input', (e) => {
                glassOpacityValue.textContent = e.target.value + '%';
            });
        }
    }

    // Create custom font dropdowns for all carousels
    for (let i = 0; i < state.carouselCount; i++) {
        const carousel = state.carousels[i] || defaultValues;
        createCustomFontDropdown(`carousel${i}TitleFont`, carousel.titleFont);
        createCustomFontDropdown(`carousel${i}ContentFont`, carousel.contentFont);
    }

    // Add paste listener to first carousel title
    const firstTitle = document.getElementById('carousel0Title');
    if (firstTitle) {
        firstTitle.addEventListener('paste', handleBulkPaste);
    }

    // Add change listeners to Carousel 1 to sync settings to other carousels
    setupCarousel1Sync();
}

// Sync Carousel 1 settings to other carousels
function setupCarousel1Sync() {
    const settingsToSync = [
        'TitleFont', 'ContentFont', 'TitleWeight', 'ContentWeight',
        'TitleSize', 'ContentSize', 'TitleColor', 'ContentColor',
        'TitleBold', 'TitleItalic', 'TitleShadow', 'TitleBgColor',
        'Separator', 'SeparatorColor', 'TextAlign', 'LineHeight', 'TextIndent',
        '3DEffect', 'Gradient', 'Glass', 'GlassColor', 'GlassOpacity', 'GlassBorderRadius',
        'PageDots', 'SwipeIndicator', 'SwipeColor', 'SwipeSize', 'SwipeStyle',
        'CustomBgOpacity', 'Template'
    ];

    settingsToSync.forEach(setting => {
        const element = document.getElementById(`carousel0${setting}`);
        if (!element) return;

        const eventType = element.type === 'checkbox' ? 'change' : 'input';

        element.addEventListener(eventType, function() {
            // Sync to all other carousels
            for (let i = 1; i < state.carouselCount; i++) {
                const targetElement = document.getElementById(`carousel${i}${setting}`);
                if (!targetElement) continue;

                if (element.type === 'checkbox') {
                    targetElement.checked = element.checked;
                } else if (element.tagName === 'SELECT') {
                    targetElement.value = element.value;
                    // Update font preview if it's a font select
                    if (setting.includes('Font')) {
                        targetElement.style.fontFamily = element.value;
                    }
                } else if (setting === 'Template') {
                    targetElement.value = element.value;
                    // Update mini template selector
                    const selector = document.getElementById(`carousel${i}TemplateSelector`);
                    if (selector) {
                        const miniTemplates = selector.querySelectorAll('.mini-template');
                        miniTemplates.forEach((mini, idx) => {
                            if (idx === parseInt(element.value)) {
                                mini.classList.add('selected');
                            } else {
                                mini.classList.remove('selected');
                            }
                        });
                    }
                } else if (element.type === 'range') {
                    // For sliders, sync both value and display text
                    targetElement.value = element.value;
                    const displaySpan = document.getElementById(`carousel${i}${setting}Value`);
                    if (displaySpan) {
                        displaySpan.textContent = element.value + '%';
                    }
                } else {
                    targetElement.value = element.value;
                }
            }
        });
    });

    // Also sync when template is selected via mini selector
    const carousel0Selector = document.getElementById('carousel0TemplateSelector');
    if (carousel0Selector) {
        carousel0Selector.addEventListener('click', function(e) {
            if (e.target.closest('.mini-template')) {
                setTimeout(() => {
                    const templateValue = document.getElementById('carousel0Template').value;
                    for (let i = 1; i < state.carouselCount; i++) {
                        const targetTemplate = document.getElementById(`carousel${i}Template`);
                        if (targetTemplate) {
                            targetTemplate.value = templateValue;

                            // Update visual selector
                            const selector = document.getElementById(`carousel${i}TemplateSelector`);
                            if (selector) {
                                const miniTemplates = selector.querySelectorAll('.mini-template');
                                miniTemplates.forEach((mini, idx) => {
                                    if (idx === parseInt(templateValue)) {
                                        mini.classList.add('selected');
                                    } else {
                                        mini.classList.remove('selected');
                                    }
                                });
                            }
                        }
                    }
                }, 10);
            }
        });
    }

    // Sync custom font dropdowns (TitleFont and ContentFont)
    const carousel0TitleFontContainer = document.getElementById('carousel0TitleFont')?.parentElement?.querySelector('.font-dropdown-container');
    const carousel0ContentFontContainer = document.getElementById('carousel0ContentFont')?.parentElement?.querySelector('.font-dropdown-container');

    if (carousel0TitleFontContainer) {
        carousel0TitleFontContainer.addEventListener('change', function() {
            const selectedFont = document.getElementById('carousel0TitleFont').value;
            for (let i = 1; i < state.carouselCount; i++) {
                const targetSelect = document.getElementById(`carousel${i}TitleFont`);
                const targetContainer = targetSelect?.parentElement?.querySelector('.font-dropdown-container');
                if (targetSelect && targetContainer) {
                    targetSelect.value = selectedFont;
                    const selectedDisplay = targetContainer.querySelector('.font-dropdown-selected');
                    if (selectedDisplay) {
                        selectedDisplay.textContent = selectedFont;
                        selectedDisplay.style.fontFamily = `'${selectedFont}', sans-serif`;
                    }
                }
            }
        });
    }

    if (carousel0ContentFontContainer) {
        carousel0ContentFontContainer.addEventListener('change', function() {
            const selectedFont = document.getElementById('carousel0ContentFont').value;
            for (let i = 1; i < state.carouselCount; i++) {
                const targetSelect = document.getElementById(`carousel${i}ContentFont`);
                const targetContainer = targetSelect?.parentElement?.querySelector('.font-dropdown-container');
                if (targetSelect && targetContainer) {
                    targetSelect.value = selectedFont;
                    const selectedDisplay = targetContainer.querySelector('.font-dropdown-selected');
                    if (selectedDisplay) {
                        selectedDisplay.textContent = selectedFont;
                        selectedDisplay.style.fontFamily = `'${selectedFont}', sans-serif`;
                    }
                }
            }
        });
    }
}

// Parse bulk paste data
function handleBulkPaste(e) {
    const pastedText = e.clipboardData.getData('text');

    // Check if it contains ### markers
    if (!pastedText.includes('###')) {
        return; // Normal paste
    }

    e.preventDefault();

    // Parse the pasted content
    const sections = pastedText.split('###').filter(s => s.trim());

    if (sections.length === 0) return;

    // Parse each section
    const parsedData = sections.map(section => {
        const lines = section.trim().split('\n');
        let title = '';
        let content = '';

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (line.startsWith('Kavram ')) {
                // Extract title after the colon
                const colonIndex = line.indexOf(':');
                if (colonIndex > -1) {
                    title = line.substring(colonIndex + 1).trim();
                }
            } else if (line.startsWith('**Açıklama:**')) {
                // Extract description
                content = line.replace('**Açıklama:**', '').trim();
            } else if (content) {
                // Continue adding to content
                content += ' ' + line;
            }
        }

        return { title, content };
    });

    // Fill the carousels
    parsedData.forEach((data, index) => {
        if (index < state.carouselCount) {
            const titleInput = document.getElementById(`carousel${index}Title`);
            const contentTextarea = document.getElementById(`carousel${index}Content`);

            if (titleInput) titleInput.value = data.title;
            if (contentTextarea) contentTextarea.value = data.content;
        }
    });

    // Show success message
    alert(`${Math.min(parsedData.length, state.carouselCount)} carousel otomatik olarak dolduruldu!`);
}

// Background size info
function updateBgSizeInfo() {
    const width = 1080 * state.carouselCount; // Ana ekran hariç
    const height = 1350;
    document.getElementById('bgSizeInfo').textContent = `${width}x${height}px`;
}

// Generate Carousels
async function generateCarousels() {
    if (!state.bgImage) {
        alert('Lütfen arka plan görseli yükleyin!');
        return;
    }

    // Save background opacity
    state.bgImageOpacity = parseInt(document.getElementById('bgImageOpacity').value) / 100;

    // Debug: Check state
    console.log('Generate carousels - State:', state);
    console.log('Carousels with customBg:', state.carousels.filter(c => c.customBg).map((c, i) => i));

    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #999;">Carousel\'ler oluşturuluyor...</p>';

    showStep('step6');

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const bgImageElement = await loadImage(state.bgImage);
        const mainImageElement = await loadImage(state.mainImage);

        previewContainer.innerHTML = '';

        // Generate main carousel
        await generateMainCarousel(previewContainer, mainImageElement);

        // Generate content carousels
        for (let i = 0; i < state.carouselCount; i++) {
            await generateContentCarousel(previewContainer, i, bgImageElement);
        }
    } catch (error) {
        console.error('Error generating carousels:', error);
        alert('Carousel oluşturulurken bir hata oluştu: ' + error.message);
    }
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Resim yüklenemedi'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Dosya okunamadı'));
        reader.readAsDataURL(file);
    });
}

async function generateMainCarousel(container, mainImage) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    // Draw main image (cover fit) with opacity
    ctx.globalAlpha = state.mainContent.imageOpacity || 1;
    drawImageCover(ctx, mainImage, 0, 0, 1080, 1350);
    ctx.globalAlpha = 1;

    // Draw text
    const template = templates[state.selectedTemplate];
    const titleStyle = state.mainContent.textAlign && state.mainContent.textAlign !== 'default'
        ? { ...template.titleStyle, textAlign: state.mainContent.textAlign }
        : template.titleStyle;
    const subtitleStyle = state.mainContent.textAlign && state.mainContent.textAlign !== 'default'
        ? { ...template.subtitleStyle, textAlign: state.mainContent.textAlign }
        : template.subtitleStyle;

    const textInfo = drawText(ctx, state.mainContent.title, titleStyle,
        state.mainContent.titleSize, state.mainContent.titleFont,
        state.mainContent.titleBold, state.mainContent.titleItalic,
        state.mainContent.titleColor, state.mainContent.titleShadow,
        state.mainContent.titleBgColor, true, state.mainContent.titleWeight,
        state.mainContent.lineHeight || 1.2, state.mainContent.textIndent || 0,
        state.mainContent.effect3D || 'none', state.mainContent.gradient || 'none', state.mainContent.glass || 'none',
        state.mainContent.glassColor || '#FFFFFF', state.mainContent.glassOpacity || 0.2, state.mainContent.glassBorderRadius || 20);

    // Draw separator
    if (state.mainContent.separator && state.mainContent.separator !== 'none') {
        drawSeparator(ctx, state.mainContent.separator, textInfo, template.titleStyle, state.mainContent.separatorColor || '#FFFFFF');
    }

    drawText(ctx, state.mainContent.subtitle, subtitleStyle,
        state.mainContent.subtitleSize, state.mainContent.subtitleFont,
        false, false, state.mainContent.subtitleColor, state.mainContent.titleShadow, '', false, state.mainContent.subtitleWeight,
        state.mainContent.lineHeight || 1.2, state.mainContent.textIndent || 0,
        'none', state.mainContent.gradient || 'none', 'none');

    // Draw page dots if enabled
    if (state.mainContent.pageDots) {
        drawPageDots(ctx, 0, state.carouselCount + 1);
    }

    // Draw swipe indicator if enabled
    if (state.mainContent.swipeIndicator) {
        drawSwipeIndicator(ctx, state.mainContent.swipeColor, state.mainContent.swipeSize, state.mainContent.swipeStyle);
    }

    addPreviewItem(container, canvas, 'Ana Ekran', 0);
}

async function generateContentCarousel(container, index, bgImage) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    const carousel = state.carousels[index];

    // Draw sliced background first (if exists) with opacity
    if (bgImage) {
        const sliceX = index * 1080;
        ctx.globalAlpha = state.bgImageOpacity || 1;
        ctx.drawImage(
            bgImage,
            sliceX, 0, 1080, 1350,
            0, 0, 1080, 1350
        );
        ctx.globalAlpha = 1;
    }

    // Draw custom background on top (if exists) with its own opacity
    if (carousel.customBg) {
        console.log(`Carousel ${index}: customBg found`, carousel.customBg);
        try {
            const customBgImage = await loadImage(carousel.customBg);
            const customOpacity = carousel.customBgOpacity !== undefined ? carousel.customBgOpacity : 1;
            console.log(`Carousel ${index}: customBg loaded, opacity: ${customOpacity}`);
            ctx.globalAlpha = customOpacity;
            drawImageCover(ctx, customBgImage, 0, 0, 1080, 1350);
            ctx.globalAlpha = 1;
        } catch (error) {
            console.error(`Carousel ${index}: Error loading customBg`, error);
        }
    } else {
        console.log(`Carousel ${index}: No customBg`);
    }

    // Draw content
    const template = templates[carousel.template !== undefined ? carousel.template : state.selectedTemplate];

    const titleStyle = carousel.textAlign && carousel.textAlign !== 'default'
        ? { ...template.titleStyle, textAlign: carousel.textAlign }
        : template.titleStyle;
    const subtitleStyle = carousel.textAlign && carousel.textAlign !== 'default'
        ? { ...template.subtitleStyle, textAlign: carousel.textAlign }
        : template.subtitleStyle;

    const textInfo = drawText(ctx, carousel.title, titleStyle,
        carousel.titleSize, carousel.titleFont,
        carousel.titleBold, carousel.titleItalic,
        carousel.titleColor, carousel.titleShadow,
        carousel.titleBgColor, true, carousel.titleWeight,
        carousel.lineHeight || 1.2, carousel.textIndent || 0,
        carousel.effect3D || 'none', carousel.gradient || 'none', carousel.glass || 'none',
        carousel.glassColor || '#FFFFFF', carousel.glassOpacity || 0.2, carousel.glassBorderRadius || 20);

    // Draw separator
    if (carousel.separator && carousel.separator !== 'none') {
        drawSeparator(ctx, carousel.separator, textInfo, titleStyle, carousel.separatorColor || '#FFFFFF');
    }

    drawText(ctx, carousel.content, subtitleStyle,
        carousel.contentSize, carousel.contentFont,
        false, false, carousel.contentColor, carousel.titleShadow, '', false, carousel.contentWeight,
        carousel.lineHeight || 1.2, carousel.textIndent || 0,
        'none', carousel.gradient || 'none', 'none');

    // Draw page dots if enabled
    if (carousel.pageDots) {
        drawPageDots(ctx, index + 1, state.carouselCount + 1);
    }

    // Draw swipe indicator if enabled
    if (carousel.swipeIndicator) {
        drawSwipeIndicator(ctx, carousel.swipeColor || '#FFFFFF', carousel.swipeSize || 'medium', carousel.swipeStyle || 'arrow');
    }

    addPreviewItem(container, canvas, `Carousel ${index + 1}`, index + 1);
}

function drawImageCover(ctx, image, x, y, width, height) {
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = image.width * (height / image.height);
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
    } else {
        drawWidth = width;
        drawHeight = image.height * (width / image.width);
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(image, x + offsetX, y + offsetY, drawWidth, drawHeight);
}

function parseStyledText(text) {
    const parts = [];
    let current = '';
    let i = 0;

    while (i < text.length) {
        // Check for ** (bold)
        if (text[i] === '*' && text[i+1] === '*') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 2;
            let boldText = '';
            while (i < text.length && !(text[i] === '*' && text[i+1] === '*')) {
                boldText += text[i];
                i++;
            }
            if (boldText) parts.push({ text: boldText, bold: true });
            i += 2;
        }
        // Check for * (italic)
        else if (text[i] === '*' && text[i+1] !== '*') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 1;
            let italicText = '';
            while (i < text.length && text[i] !== '*') {
                italicText += text[i];
                i++;
            }
            if (italicText) parts.push({ text: italicText, italic: true });
            i += 1;
        }
        // Check for == (highlight)
        else if (text[i] === '=' && text[i+1] === '=') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 2;
            let highlightText = '';
            while (i < text.length && !(text[i] === '=' && text[i+1] === '=')) {
                highlightText += text[i];
                i++;
            }
            if (highlightText) parts.push({ text: highlightText, highlight: true });
            i += 2;
        }
        // Check for ++ (bigger) with optional size multiplier: ++1.5|text++ or ++text++
        else if (text[i] === '+' && text[i+1] === '+') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 2;
            let content = '';
            while (i < text.length && !(text[i] === '+' && text[i+1] === '+')) {
                content += text[i];
                i++;
            }

            // Check if content has size multiplier: "1.5:actual text" or "1.5|actual text"
            let sizeMultiplier = 1.3; // default
            let actualText = content;

            // Support both : and | as separators
            const separator = content.includes(':') ? ':' : (content.includes('|') ? '|' : null);
            if (separator) {
                const parts = content.split(separator);
                const parsedSize = parseFloat(parts[0]);
                if (!isNaN(parsedSize) && parsedSize > 0) {
                    sizeMultiplier = parsedSize;
                    actualText = parts.slice(1).join(separator); // in case text has separator
                }
            }

            if (actualText) parts.push({ text: actualText, sizeMultiplier: sizeMultiplier });
            i += 2;
        }
        // Check for -- (smaller) with optional size multiplier: --0.7|text-- or --text--
        else if (text[i] === '-' && text[i+1] === '-') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 2;
            let content = '';
            while (i < text.length && !(text[i] === '-' && text[i+1] === '-')) {
                content += text[i];
                i++;
            }

            // Check if content has size multiplier: "0.7:actual text" or "0.7|actual text"
            let sizeMultiplier = 0.8; // default
            let actualText = content;

            // Support both : and | as separators
            const separator = content.includes(':') ? ':' : (content.includes('|') ? '|' : null);
            if (separator) {
                const parts = content.split(separator);
                const parsedSize = parseFloat(parts[0]);
                if (!isNaN(parsedSize) && parsedSize > 0) {
                    sizeMultiplier = parsedSize;
                    actualText = parts.slice(1).join(separator);
                }
            }

            if (actualText) parts.push({ text: actualText, sizeMultiplier: sizeMultiplier });
            i += 2;
        }
        // Check for __ (underline)
        else if (text[i] === '_' && text[i+1] === '_') {
            if (current) {
                parts.push({ text: current });
                current = '';
            }
            i += 2;
            let underlineText = '';
            while (i < text.length && !(text[i] === '_' && text[i+1] === '_')) {
                underlineText += text[i];
                i++;
            }
            if (underlineText) parts.push({ text: underlineText, underline: true });
            i += 2;
        }
        else {
            current += text[i];
            i++;
        }
    }

    if (current) parts.push({ text: current });
    return parts;
}

function drawText(ctx, text, style, fontSize, fontFamily, bold, italic, color, shadow, bgColor, isTitle, weight = '400', lineHeight = 1.2, textIndent = 0, effect3D = 'none', gradient = 'none', glass = 'none', glassColor = '#FFFFFF', glassOpacity = 0.2, glassBorderRadius = 20) {
    if (!text) return null;

    ctx.textBaseline = 'top';

    let fontStyle = '';
    if (italic) fontStyle += 'italic ';

    // Use weight parameter instead of bold checkbox if provided
    const fontWeight = weight || (bold ? '700' : '400');

    ctx.font = `${fontStyle}${fontWeight} ${fontSize}px "${fontFamily}"`;

    // Calculate position
    let x = 0, y = 0;
    const padding = 50;
    const maxWidth = 1080 - (padding * 2);

    if (style.left) {
        if (style.left === '50%') {
            x = 540;
        } else if (style.left.endsWith('%')) {
            x = (1080 * parseInt(style.left)) / 100;
        } else {
            x = padding;
        }
    } else if (style.right) {
        if (style.right.endsWith('%')) {
            x = 1080 - (1080 * parseInt(style.right)) / 100;
        } else {
            x = 1080 - padding;
        }
    }

    if (style.top) {
        if (style.top.endsWith('%')) {
            y = (1350 * parseInt(style.top)) / 100;
        } else {
            y = padding;
        }
    } else if (style.bottom) {
        if (style.bottom.endsWith('%')) {
            y = 1350 - (1350 * parseInt(style.bottom)) / 100;
        } else {
            y = 1350 - padding - fontSize;
        }
    }

    // Set text alignment
    if (style.textAlign === 'center') {
        ctx.textAlign = 'center';
    } else if (style.textAlign === 'right') {
        ctx.textAlign = 'right';
    } else {
        ctx.textAlign = 'left';
    }

    // For styled text (with ** or ==), use a different word wrap approach
    let lines = [];
    let totalHeight = 0;

    // Check if text has styling
    const hasStyleMarkup = text.includes('**') || text.includes('*') || text.includes('==') ||
                           text.includes('++') || text.includes('--') || text.includes('__');

    if (hasStyleMarkup) {
        // First split by paragraphs if they exist
        const paragraphs = text.split('\n');

        paragraphs.forEach((paragraph, paragraphIndex) => {
            if (paragraph.trim() === '') {
                // Empty line - add spacing
                lines.push({ text: '', styled: false });
                return;
            }

            // Parse styled text for this paragraph
            const textParts = parseStyledText(paragraph);

            // Word wrap with styled text
            const paragraphLines = wrapStyledText(ctx, textParts, maxWidth * 0.9, fontSize, fontFamily);
            lines.push(...paragraphLines);
        });

        totalHeight = lines.length * fontSize * lineHeight;
    } else {
        // Simple word wrap for plain text - handle \n for paragraphs
        const paragraphs = text.split('\n');

        paragraphs.forEach((paragraph, paragraphIndex) => {
            if (paragraph.trim() === '') {
                // Empty line - add spacing
                lines.push({ text: '', styled: false });
                return;
            }

            const words = paragraph.split(' ');
            let line = '';

            for (let word of words) {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);

                if (metrics.width > maxWidth * 0.9 && line !== '') {
                    lines.push({ text: line.trim(), styled: false });
                    line = word + ' ';
                } else {
                    line = testLine;
                }
            }
            if (line.trim()) lines.push({ text: line.trim(), styled: false });
        });

        totalHeight = lines.length * fontSize * lineHeight;
    }

    // Calculate text bounds for effects
    const maxLineWidth = Math.max(...lines.map(l => {
        if (l.styled) {
            return calculateStyledLineWidth(ctx, l.parts, fontSize, fontFamily);
        } else {
            return ctx.measureText(l.text).width;
        }
    }));

    let textBoundsX = x;
    if (style.textAlign === 'center') textBoundsX = x - maxLineWidth / 2;
    else if (style.textAlign === 'right') textBoundsX = x - maxLineWidth;

    // Draw glassmorphism box first (behind text)
    if (glass && glass !== 'none') {
        drawGlassBox(ctx, textBoundsX, y, maxLineWidth, totalHeight, glass, glassColor, glassOpacity, glassBorderRadius);
    }

    // Draw background if specified
    if (bgColor && bgColor !== '#000000') {
        ctx.fillStyle = bgColor;
        const bgPadding = 20;
        ctx.fillRect(textBoundsX - bgPadding, y - bgPadding/2, maxLineWidth + bgPadding*2, totalHeight + bgPadding);
    }

    // Apply gradient if specified (overrides color)
    let finalColor = color;
    if (gradient && gradient !== 'none') {
        const gradientFill = createTextGradient(ctx, gradient, textBoundsX, y, maxLineWidth, totalHeight);
        if (gradientFill) finalColor = gradientFill;
    }

    // Draw lines with shadow and effects
    if (shadow && effect3D === 'none') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
    }

    lines.forEach((line, i) => {
        const lineY = y + (i * fontSize * lineHeight);
        let lineX = x;

        // Apply text indent to first line only
        if (i === 0 && textIndent > 0) {
            if (style.textAlign === 'left' || !style.textAlign) {
                lineX += textIndent;
            }
        }

        // Apply 3D effect before drawing
        if (effect3D && effect3D !== 'none' && !line.styled) {
            apply3DEffect(ctx, line.text, lineX, lineY, fontSize, fontFamily, fontWeight, italic, effect3D, color);
        }

        ctx.fillStyle = finalColor;

        if (line.styled) {
            // Draw styled text
            drawStyledLineParts(ctx, line.parts, lineX, lineY, fontSize, fontFamily, finalColor, shadow, style.textAlign);
        } else {
            ctx.fillText(line.text, lineX, lineY);
        }
    });

    ctx.shadowColor = 'transparent';

    // Calculate actual text bounds for separators
    let startX = textBoundsX;
    let endX = textBoundsX + maxLineWidth;

    return {
        x,
        y,
        width: maxLineWidth,
        height: totalHeight,
        startX: startX,
        endX: endX
    };
}

// Helper function to wrap styled text
function wrapStyledText(ctx, parts, maxWidth, fontSize, fontFamily) {
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;

    parts.forEach(part => {
        const words = part.text.split(' ');

        words.forEach((word, wordIndex) => {
            if (!word && wordIndex === 0) return; // Skip leading spaces

            // Add space before word if not first word in line
            const wordWithSpace = (currentLine.length > 0 ? ' ' : '') + word;
            const partCopy = { ...part, text: wordWithSpace };

            // Calculate font size based on modifiers
            const partFontSize = part.sizeMultiplier ? fontSize * part.sizeMultiplier : fontSize;

            // Measure width with proper font style
            const fontStyle = `${part.italic ? 'italic ' : ''}${part.bold ? 'bold ' : ''}${partFontSize}px "${fontFamily}"`;
            ctx.font = fontStyle;
            const wordWidth = ctx.measureText(wordWithSpace).width;

            if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
                // Start new line
                lines.push({ styled: true, parts: currentLine });
                currentLine = [{ ...part, text: word }];
                ctx.font = fontStyle;
                currentWidth = ctx.measureText(word).width;
            } else {
                currentLine.push(partCopy);
                currentWidth += wordWidth;
            }
        });
    });

    if (currentLine.length > 0) {
        lines.push({ styled: true, parts: currentLine });
    }

    return lines;
}

// Helper function to calculate styled line width
function calculateStyledLineWidth(ctx, parts, fontSize, fontFamily) {
    let totalWidth = 0;
    parts.forEach(part => {
        const partFontSize = part.sizeMultiplier ? fontSize * part.sizeMultiplier : fontSize;
        ctx.font = `${part.italic ? 'italic ' : ''}${part.bold ? 'bold ' : ''}${partFontSize}px "${fontFamily}"`;
        totalWidth += ctx.measureText(part.text).width;
    });
    return totalWidth;
}

// Draw styled line parts with proper alignment
function drawStyledLineParts(ctx, parts, x, y, fontSize, fontFamily, baseColor, shadow, textAlign) {
    const totalWidth = calculateStyledLineWidth(ctx, parts, fontSize, fontFamily);

    let currentX = x;
    if (textAlign === 'center') {
        currentX = x - totalWidth / 2;
    } else if (textAlign === 'right') {
        currentX = x - totalWidth;
    }

    const originalAlign = ctx.textAlign;
    ctx.textAlign = 'left'; // Draw parts left-aligned from calculated position

    parts.forEach(part => {
        // Calculate font size for this part
        const partFontSize = part.sizeMultiplier ? fontSize * part.sizeMultiplier : fontSize;

        // Set font with all styles
        ctx.font = `${part.italic ? 'italic ' : ''}${part.bold ? 'bold ' : ''}${partFontSize}px "${fontFamily}"`;

        // Measure text width
        const textWidth = ctx.measureText(part.text).width;

        if (part.highlight) {
            // Draw highlight background
            const tempShadow = ctx.shadowColor;
            ctx.shadowColor = 'transparent';
            ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
            ctx.fillRect(currentX, y, textWidth, partFontSize);
            ctx.shadowColor = tempShadow;
        }

        // Draw text
        ctx.fillStyle = baseColor;
        ctx.fillText(part.text, currentX, y);

        // Draw underline if needed
        if (part.underline) {
            const underlineY = y + partFontSize - 2;
            ctx.beginPath();
            ctx.moveTo(currentX, underlineY);
            ctx.lineTo(currentX + textWidth, underlineY);
            ctx.strokeStyle = baseColor;
            ctx.lineWidth = Math.max(1, partFontSize / 20);
            ctx.stroke();
        }

        currentX += textWidth;
    });

    ctx.textAlign = originalAlign;
}

// Helper to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

function drawSeparator(ctx, separatorType, textInfo, style, color = '#FFFFFF') {
    if (!textInfo) return;

    // Use actual text bounds from textInfo
    const startX = textInfo.startX;
    const endX = textInfo.endX;
    const width = endX - startX;
    const centerX = startX + width / 2;
    const y = textInfo.y + textInfo.height + 20;

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    switch(separatorType) {
        case 'line-thin':
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            break;

        case 'line-thick':
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            break;

        case 'line-double':
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(startX, y + 6);
            ctx.lineTo(endX, y + 6);
            ctx.stroke();
            break;

        case 'line-dotted':
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            ctx.setLineDash([]);
            break;

        case 'line-dashed':
            ctx.lineWidth = 3;
            ctx.setLineDash([20, 10]);
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            ctx.setLineDash([]);
            break;

        case 'line-gradient':
            const gradient = ctx.createLinearGradient(startX, y, endX, y);
            const rgb = hexToRgb(color);
            gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            gradient.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},1)`);
            gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            break;

        case 'box-minimal':
            ctx.lineWidth = 2;
            ctx.strokeRect(startX - 20, textInfo.y - 10, width + 40, textInfo.height + 20);
            break;

        case 'box-rounded':
            ctx.lineWidth = 3;
            roundRect(ctx, startX - 20, textInfo.y - 10, width + 40, textInfo.height + 20, 15);
            ctx.stroke();
            break;

        case 'box-shadow':
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 20;
            ctx.lineWidth = 3;
            roundRect(ctx, startX - 20, textInfo.y - 10, width + 40, textInfo.height + 20, 10);
            ctx.stroke();
            ctx.shadowColor = 'transparent';
            break;

        case 'decorative':
            ctx.lineWidth = 2;
            // Center ornament
            ctx.fillRect(centerX - 30, y - 5, 60, 3);
            // Side dots
            ctx.beginPath();
            ctx.arc(centerX - 40, y - 3, 5, 0, Math.PI * 2);
            ctx.arc(centerX + 40, y - 3, 5, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Apply 3D Text Effect
function apply3DEffect(ctx, text, x, y, fontSize, fontFamily, weight, italic, effect, color) {
    if (effect === 'none') return;

    const fontStyle = italic ? 'italic ' : '';
    ctx.font = `${fontStyle}${weight} ${fontSize}px "${fontFamily}"`;
    ctx.textBaseline = 'top';

    if (effect === 'depth') {
        // Create depth effect with layers
        for (let i = 5; i > 0; i--) {
            ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (6 - i)})`;
            ctx.fillText(text, x + i, y + i);
        }
    } else if (effect === 'pop') {
        // Pop-out effect with strong shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
    } else if (effect === 'layers') {
        // Layered color effect
        const rgb = hexToRgb(color);
        ctx.fillStyle = `rgba(${rgb.r - 50}, ${rgb.g}, ${rgb.b + 50}, 0.5)`;
        ctx.fillText(text, x - 3, y - 3);
        ctx.fillStyle = `rgba(${rgb.r + 50}, ${rgb.g - 50}, ${rgb.b}, 0.5)`;
        ctx.fillText(text, x + 3, y + 3);
    }
}

// Create Gradient for Text
function createTextGradient(ctx, gradientType, x, y, width, height) {
    if (gradientType === 'none') return null;

    let gradient;

    switch(gradientType) {
        case 'sunset':
            gradient = ctx.createLinearGradient(x, y, x + width, y);
            gradient.addColorStop(0, '#FF6B6B');
            gradient.addColorStop(0.5, '#FFD93D');
            gradient.addColorStop(1, '#FF6B9D');
            break;
        case 'ocean':
            gradient = ctx.createLinearGradient(x, y, x + width, y);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(0.5, '#64B5F6');
            gradient.addColorStop(1, '#4FC3F7');
            break;
        case 'fire':
            gradient = ctx.createLinearGradient(x, y, x, y + height);
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(0.5, '#FF6347');
            gradient.addColorStop(1, '#DC143C');
            break;
        case 'purple':
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, '#9D50BB');
            gradient.addColorStop(0.5, '#6E48AA');
            gradient.addColorStop(1, '#E73C7E');
            break;
        case 'rainbow':
            gradient = ctx.createLinearGradient(x, y, x + width, y);
            gradient.addColorStop(0, '#FF0080');
            gradient.addColorStop(0.2, '#FF8C00');
            gradient.addColorStop(0.4, '#FFD700');
            gradient.addColorStop(0.6, '#40E0D0');
            gradient.addColorStop(0.8, '#4169E1');
            gradient.addColorStop(1, '#9370DB');
            break;
        default:
            return null;
    }

    return gradient;
}

// Draw Glassmorphism Box
function drawGlassBox(ctx, x, y, width, height, glassType, customColor = '#FFFFFF', customOpacity = 0.2, borderRadius = 20) {
    if (glassType === 'none') return;

    ctx.shadowColor = 'transparent';

    const padding = 30;
    const boxX = x - padding;
    const boxY = y - padding;
    const boxWidth = width + padding * 2;
    const boxHeight = height + padding * 2;

    if (glassType === 'custom') {
        // Custom glass settings
        const rgb = hexToRgb(customColor);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${customOpacity})`;
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(customOpacity + 0.1, 1)})`;
    } else if (glassType === 'light') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    } else if (glassType === 'dark') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    } else if (glassType === 'frosted') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    }

    ctx.lineWidth = 2;
    roundRect(ctx, boxX, boxY, boxWidth, boxHeight, borderRadius);
    ctx.fill();
    ctx.stroke();
}

// Draw Page Dots
function drawPageDots(ctx, currentPage, totalPages) {
    const dotSize = 8;
    const spacing = 15;
    const totalWidth = (totalPages * dotSize) + ((totalPages - 1) * spacing);
    const startX = (1080 - totalWidth) / 2;
    const y = 1300;

    ctx.shadowColor = 'transparent';

    for (let i = 0; i < totalPages; i++) {
        ctx.beginPath();
        const x = startX + (i * (dotSize + spacing));
        ctx.arc(x + dotSize/2, y, dotSize/2, 0, Math.PI * 2);

        if (i === currentPage) {
            ctx.fillStyle = '#FFFFFF';
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        }

        ctx.fill();
    }
}

// Draw Swipe Indicator
function drawSwipeIndicator(ctx, color = '#FFFFFF', size = 'medium', style = 'arrow') {
    ctx.shadowColor = 'transparent';

    const centerX = 1080 - 60;
    const centerY = 1350 / 2;

    // Size settings
    const sizes = {
        small: { scale: 0.7, fontSize: 12, lineWidth: 2 },
        medium: { scale: 1, fontSize: 14, lineWidth: 3 },
        large: { scale: 1.4, fontSize: 16, lineWidth: 4 }
    };
    const sizeConfig = sizes[size] || sizes.medium;

    // Parse color with opacity
    const rgb = hexToRgb(color);
    const colorWithOpacity = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
    const colorWithLightOpacity = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;

    ctx.strokeStyle = colorWithOpacity;
    ctx.fillStyle = colorWithOpacity;
    ctx.lineWidth = sizeConfig.lineWidth;

    const arrowLength = 30 * sizeConfig.scale;
    const arrowHeadSize = 8 * sizeConfig.scale;

    switch(style) {
        case 'arrow':
            // Arrow shaft
            ctx.beginPath();
            ctx.moveTo(centerX - arrowLength * 0.7, centerY);
            ctx.lineTo(centerX + arrowLength * 0.3, centerY);
            ctx.stroke();

            // Arrow head
            ctx.beginPath();
            ctx.moveTo(centerX + arrowLength * 0.3, centerY);
            ctx.lineTo(centerX + arrowLength * 0.3 - arrowHeadSize, centerY - arrowHeadSize);
            ctx.lineTo(centerX + arrowLength * 0.3 - arrowHeadSize, centerY + arrowHeadSize);
            ctx.closePath();
            ctx.fill();
            break;

        case 'chevron':
            // Chevron shape
            ctx.beginPath();
            ctx.moveTo(centerX - arrowLength * 0.4, centerY - arrowHeadSize * 1.5);
            ctx.lineTo(centerX + arrowLength * 0.2, centerY);
            ctx.lineTo(centerX - arrowLength * 0.4, centerY + arrowHeadSize * 1.5);
            ctx.stroke();
            break;

        case 'line':
            // Three vertical lines
            for (let i = 0; i < 3; i++) {
                const x = centerX - 15 * sizeConfig.scale + i * 10 * sizeConfig.scale;
                ctx.beginPath();
                ctx.moveTo(x, centerY - 12 * sizeConfig.scale);
                ctx.lineTo(x, centerY + 12 * sizeConfig.scale);
                ctx.stroke();
            }
            break;

        case 'circle':
            // Circle with arrow
            ctx.beginPath();
            ctx.arc(centerX, centerY, 18 * sizeConfig.scale, 0, Math.PI * 2);
            ctx.stroke();

            // Arrow inside
            ctx.beginPath();
            ctx.moveTo(centerX - 8 * sizeConfig.scale, centerY);
            ctx.lineTo(centerX + 8 * sizeConfig.scale, centerY);
            ctx.moveTo(centerX + 8 * sizeConfig.scale, centerY);
            ctx.lineTo(centerX + 3 * sizeConfig.scale, centerY - 5 * sizeConfig.scale);
            ctx.moveTo(centerX + 8 * sizeConfig.scale, centerY);
            ctx.lineTo(centerX + 3 * sizeConfig.scale, centerY + 5 * sizeConfig.scale);
            ctx.stroke();
            break;
    }

    // Text "Swipe"
    ctx.font = `${sizeConfig.fontSize}px "Montserrat"`;
    ctx.fillStyle = colorWithLightOpacity;
    ctx.textAlign = 'center';
    ctx.fillText('Swipe', centerX, centerY + 25 * sizeConfig.scale);
}

function addPreviewItem(container, canvas, label, index) {
    const item = document.createElement('div');
    item.className = 'preview-item';

    // Add edit button (gear icon) for carousel slides (not for main slide)
    if (index > 0) {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '⚙️';
        editBtn.title = 'Düzenle';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            editCarousel(index - 1); // index-1 because carousel array is 0-based
        };
        item.appendChild(editBtn);
    }

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.textContent = `${label} - İndir`;
    downloadBtn.onclick = () => downloadCanvas(canvas, `carousel-${index}.png`);

    item.appendChild(canvas);
    item.appendChild(downloadBtn);
    container.appendChild(item);
}

function downloadCanvas(canvas, filename) {
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    });
}

function downloadAll() {
    const canvases = document.querySelectorAll('.preview-item canvas');
    canvases.forEach((canvas, index) => {
        setTimeout(() => {
            downloadCanvas(canvas, `carousel-${index}.png`);
        }, index * 500);
    });
}
