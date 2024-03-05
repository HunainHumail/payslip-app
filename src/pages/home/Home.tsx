import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ListContainer from '../../components/ListComponent/ListContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payslip App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Payslip App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ListContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
