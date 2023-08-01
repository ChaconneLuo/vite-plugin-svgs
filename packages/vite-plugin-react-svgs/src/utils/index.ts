export function encodeSvg(svg: string) {
  return svg
    .replace(
      '<svg',
      ~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    .replace(/"/g, '\'')
    .replace(/%/g, '%25')
    // .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    // .replace(/</g, '%3C')
    // .replace(/>/g, '%3E');
}

export function getDataSvg(svg: string){
  const svgData = encodeSvg(svg).replace(/width='.*?'/, '').replace(/height='.*?'/, '{}');
  return svgData;
  // return `data:image/svg+xml;utf8,${svgData}`;
}

export function getCssUrl(svg: string) {
  return `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`;
}
