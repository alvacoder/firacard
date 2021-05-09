import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
class DownloadBoard {
    download(board: any, seletedTemplate: any): void {
        const wrapper: any = document.getElementById('board-container');
        const style = {
            '.board-container': {
                'background': `url(${seletedTemplate.low_res_url})`
            }
        };
        console.log(style);
        // htmlToImage.toBlob(wrapper, {style}).then((blob: any) => {
        //     saveAs(blob, 'myScreenshot.png');
        // });
        htmlToImage.toPng(wrapper)
            .then((dataUrl: any) => {
                saveAs(dataUrl, `${board.boardTitle}.png`);
        });
        console.log('download board');
    }
    urlsToAbsolute(nodeList: any): any {
        if (!nodeList.length) {
            return [];
        }
        let attrName = 'href';
        if (nodeList[0].__proto__ === HTMLImageElement.prototype || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
            attrName = 'src';
        }
        nodeList = [].map.call(nodeList, (el: any, i) => {
            const attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            const absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }
    screenshotPage(): void {
        const wrapper: any = document.getElementById('board-container');
        htmlToImage.toBlob(wrapper).then((blob: any) => {
            saveAs(blob, 'myScreenshot.png');
        });

        return;
        html2canvas(wrapper, {allowTaint : true, useCORS: true}).then((canvas: any) => {
            console.log({canvas});
            canvas.toBlob((blob: any) => {
                saveAs(blob, 'myScreenshot.png');
            });
        });
    }
    addOnPageLoad_(): void {
        window.addEventListener('DOMContentLoaded', (e) => {
            const scrollX: any = document.documentElement.dataset.scrollX || 0;
            const scrollY: any = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
        });
    }
}
export default DownloadBoard;
