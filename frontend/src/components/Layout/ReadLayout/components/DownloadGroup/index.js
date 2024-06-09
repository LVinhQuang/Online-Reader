import FileSaver from 'file-saver';
import classNames from "classnames/bind" 
import styles from "./DownloadGroup.module.scss";
import ButtonReadPage from '../ButtonReadPage';


const cx= classNames.bind(styles)

function DownloadGroup({downloadTypeList,downloadUrl}) {
    async function DownloadApi(downloadType) {            
        try {            
            const response = await fetch(`${downloadUrl}/${downloadType}`);
            if (response.ok) {
                const blob = await response.blob();
                FileSaver.saveAs(blob, `book.${downloadType}`);
            } else {
                console.error('Failed to download file');
            }
        }
        catch(error) {
            console.error('Error during fetch:', error);
        }
        finally {
          //setLoading(false);
        }
    }
    
    return  <div className={cx("group-download")}>
            {downloadTypeList &&
            downloadTypeList.map((element, index) => {
                return (
                    <ButtonReadPage key={index}>
                        <span  onClick={() => DownloadApi(element)}>
                            Tải {element} file
                        </span>               
                    </ButtonReadPage>
                );
            })}
        </div>
}

export default DownloadGroup;