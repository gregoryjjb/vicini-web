const { localStorage } = window;

export const getSettings = () => {
    
    let lightMode = localStorage.getItem('lightMode') === 'true';
    
    return {
        lightMode,
    }
}

export const setSettings = ({ lightMode }) => {
    
    localStorage.setItem('lightMode', lightMode ? 'true' : 'false');
}