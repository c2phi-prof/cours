document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('content');
    if (!container) return;

    // Replace custom syntax with clickable elements
    container.innerHTML = container.innerHTML.replace(/\/([^:\/]+):([^\/]+)\//g, '<span class="gloss" data-exp="$2">$1</span>');

    // Attach click handlers to reveal explanations
    container.querySelectorAll('.gloss').forEach(el => {
        el.addEventListener('click', () => {
            let tooltip = el.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            } else {
                tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = el.dataset.exp;
                el.appendChild(tooltip);
            }
        });
    });
});
