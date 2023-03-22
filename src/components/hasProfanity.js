export default function hasProfanity(word) {
    const LC = word.toLowerCase();

    if( LC.includes('shit') || 
        LC.includes('fuck') || 
        LC.includes('cunt') || 
        LC.includes('asshole') || 
        LC.includes('bitch') || 
        LC.includes('dick') || 
        LC.includes('nigger') || 
        LC.includes('nazi') || 
        LC.includes('balls') || 
        LC.includes('suck') ||
        LC.includes('penis') || 
        LC.includes('whore')) {
            return true;
    }
    return false;
}