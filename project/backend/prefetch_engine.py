def analyze_pattern(pattern: str):
    # Simple rule based prefetch prediction
    blocks = [b.strip() for b in pattern.split("->") if b.strip()]
    
    if len(blocks) < 2:
        return "Unknown", 0.0
        
    last_block = blocks[-1]
    
    # Very simple ASCII increment simulation
    try:
        if len(last_block) == 1 and last_block.isalpha():
            next_char = chr(ord(last_block) + 1)
            return next_char, 0.80
    except:
        pass
        
    return "NextBlock", 0.50
