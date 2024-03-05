import { IonRow, IonCol, IonItem, IonLabel, IonList, } from '@ionic/react';
import './ListContainer.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mockData } from '../../mocks/invoice';



interface ContainerProps { }

const ListContainer: React.FC<ContainerProps> = () => {
  const history = useHistory();

  const [invoices, setInvoices] = useState(mockData)

  const handleItemPress = (data: any) => {
    // Navigate to PaySlipDetails screen with the selected ID
    history.push({
      pathname: `/payslipdetail/${data.id}`,
      state: { detail: data } // Pass data as state
    });
  };

  return (
    <IonRow>
      <IonCol>
        <IonList className='slide-in'>
          <IonItem className="ion-text-center">
            <IonLabel>
              <strong id={"strongStyle"}>Name</strong>
            </IonLabel>
            <IonLabel>
              <strong id={"strongStyle"}>From Date</strong>
            </IonLabel>
            <IonLabel>
              <strong id={"strongStyle"}>To Date</strong>
            </IonLabel>
          </IonItem>
          {invoices.map(data =>
            <IonItem className="ion-text-center list-item" key={data.id} onClick={() => handleItemPress(data)}>
              <IonLabel>
                {data.name}
              </IonLabel>
              <IonLabel>
                {data.fromDate}
              </IonLabel>
              <IonLabel>
                {data.toDate}
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonCol>
    </IonRow>
  );
};

export default ListContainer;
