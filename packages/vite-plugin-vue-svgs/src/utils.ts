export function encodeSvg(svg: string) {
  return svg
    .replace(
      '<svg',
      ~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
}

export function getSvgStyle(svg: string) {
  const mode = svg.includes('currentColor') ? 'mask' : 'background';
  const uri = `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`;
  if (mode === 'mask') {
    return `{
      mask: ${uri} no-repeat,
      mask-size: '100% 100%',
      background-color: currentColor,
      height: 1em,
      width: 1em,
    }`;
  }
  // 彩色图标
  else {
    return `{
      background: ${uri} no-repeat,
      background-size: '100% 100%',
      background-color: transparent,
      height: 1em,
      width: 1em,
    }`;
  }
}
