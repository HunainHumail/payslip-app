import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import './Home.css';
import { chevronBack } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom';
import { Toast } from '@capacitor/toast';
import './PayslipDetail.css'
import { DetailData } from './interfaces';



const PayslipDetail: React.FC = () => {
    const location: any = useLocation();
    const history = useHistory();
    const detailData: DetailData = location.state && location.state.detail;
    const handleGoBack = () => {
        // Navigate back to the Home screen
        history.goBack();
    };

    const downloadFile = (href: any, filename: any) => {
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
            if (link.parentNode !== null) {
                link.parentNode.removeChild(link);
            }
        }, 0);
    }

    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    const handleDownloadPdf = async () => {
        let timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        let filename = `hunaininvoice_${timestamp}.pdf`; // Name of your PDF file uniquely
        let pdfFile = detailData?.file

        try {
            if (Capacitor.isNativePlatform()) {
                try {
                    const filePath = Capacitor.convertFileSrc(pdfFile)
                    const response = await fetch(filePath)
                    const blob = await response.blob();
                    const base64: any = await convertBlobToBase64(blob)
                    const result = await Filesystem.writeFile({
                        path: filename,
                        data: base64,
                        directory: Directory.Documents,
                    });
                    Toast.show({ text: "File saved to: " + result.uri, duration: "short", position: "bottom" })
                } catch (error) {
                    console.error('Error saving file:', error);
                    Toast.show({ text: "Error saving file", duration: "short", position: "bottom" })
                }

            } else {
                const response = await fetch(pdfFile);
                const blob = await response.blob();

                // Create a temporary anchor element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', filename);

                // Trigger the click event on the anchor to start the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonRow>
                        <IonIcon onClick={handleGoBack} size='large' icon={chevronBack}></IonIcon>
                        <IonTitle>Invoice</IonTitle>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Invoice</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="card-container">
                    <IonCard className="card-content">
                        <IonCardHeader>
                            <IonCardTitle className="card-title">Invoice Details</IonCardTitle>
                            <IonCardSubtitle className="card-subtitle">Name: {detailData?.name}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent className="card-details">
                            ID: {detailData?.id} <br />
                            From Date: {detailData?.fromDate} <br />
                            To Date: {detailData?.toDate}
                        </IonCardContent>
                        <IonButton className="download-button" onClick={handleDownloadPdf} fill="clear">
                            Download PDF
                        </IonButton>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PayslipDetail;
