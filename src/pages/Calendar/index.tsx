import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarContainer } from './styles';
import { Title } from '../../components/Title';

export const Calendar = () => {

  return (
    <CalendarContainer>
      <Title>Calendário de Projetos</Title>
      <div style={{ height: '70vh' }}>
      </div>
    </CalendarContainer>
  );
};