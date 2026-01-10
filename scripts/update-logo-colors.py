#!/usr/bin/env python3
"""Update SVG logo colors from pink/red to blue gradient"""

import re

# Color mapping: pink/red shades → blue shades
COLOR_MAP = {
    # Bright pinks → blue-400
    '#FA5C5F': '#60a5fa',
    '#F76D5E': '#60a5fa',
    '#F86D60': '#60a5fa',
    '#FA7C6B': '#60a5fa',
    '#F66563': '#60a5fa',
    '#F75E64': '#60a5fa',
    '#F65468': '#60a5fa',
    '#FA5F61': '#60a5fa',
    '#F56762': '#60a5fa',
    '#F85765': '#60a5fa',
    '#F55C66': '#60a5fa',
    '#F25262': '#60a5fa',
    
    # Medium pinks → blue-500
    '#EA5167': '#3b82f6',
    '#DE5E74': '#3b82f6',
    '#E87175': '#3b82f6',
    '#ED6B74': '#3b82f6',
    '#EF717B': '#3b82f6',
    '#E0687B': '#3b82f6',
    '#E9777B': '#3b82f6',
    '#ED7276': '#3b82f6',
    '#E14469': '#3b82f6',
    '#E96D7C': '#3b82f6',
    '#F3746E': '#60a5fa',
    
    # Dark pinks → blue-600
    '#D8426C': '#2563eb',
    '#D84D69': '#2563eb',
    '#D0577D': '#2563eb',
    '#D85074': '#2563eb',
    '#D05C83': '#2563eb',
    '#D0597E': '#2563eb',
    '#D6466D': '#2563eb',
    
    # Very light pinks → blue-300
    '#EB8370': '#93c5fd',
    '#EA8481': '#93c5fd',
    '#EB8479': '#93c5fd',
    '#EA7580': '#93c5fd',
    '#EF7E7D': '#93c5fd',
    '#E38480': '#93c5fd',
    
    # Darker shades → blue-700
    '#B45961': '#1e40af',
    '#B34373': '#1e40af',
    '#C73E6D': '#1e40af',
    '#CC3B6F': '#1e40af',
    '#B84B6B': '#1e40af',
    '#BE5B7A': '#1e40af',
    '#C0376F': '#1e40af',
    
    # Darkest → blue-900
    '#7A2D48': '#1e3a8a',
    '#A74669': '#1e3a8a',
    '#823B42': '#1e3a8a',
}

def update_svg_colors(input_file, output_file):
    """Read SVG, replace colors, write output"""
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Replace all colors
    for old_color, new_color in COLOR_MAP.items():
        # Case insensitive replacement
        pattern = re.compile(re.escape(old_color), re.IGNORECASE)
        content = pattern.sub(new_color, content)
    
    with open(output_file, 'w') as f:
        f.write(content)
    
    print(f"✅ Logo colors updated! Replaced {len(COLOR_MAP)} colors.")
    print(f"   Old logo: {input_file}")
    print(f"   New logo: {output_file}")

if __name__ == '__main__':
    input_file = 'public/assets/svg_logo.svg'
    output_file = 'public/assets/svg_logo.svg'
    update_svg_colors(input_file, output_file)
