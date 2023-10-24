
import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import EventCard from '../eventsList/EventCard';
import EventList from '../eventsList/EventsList';
import NewHeader from '../header/NewHeader';
import { useNavigate } from 'react-router-dom';



export default function UserHomePage() {
  const navigate = useNavigate();

  const [selectedView, setSeletectedView] = useState<'event' | 'myEvent'>('event');
  const user = useAppSelector((state) => state.login);


  return (
    <div className="page-container">
      <div className="navigation-bar">
        <NewHeader />
      </div>

      <div className="content-display">
        {selectedView === 'event' ? (
          <EventList />
        ) : (
          <div>
            {user.user_events ? (
              user.user_events.map((event) => (
                <div key={event.id}>
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <h1>No Registered Events</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
