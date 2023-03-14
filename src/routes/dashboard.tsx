import { redirect, RouteObject } from 'react-router-dom';
import DHome from '../pages/dashboard/d-home';
import DLayout from '../pages/dashboard/d-layout';
import DRoom from '../pages/dashboard/d-room';
import { getProfile } from '../services/auth.service';

const routeDashboard: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DLayout />,
    loader: async () => {
       const response = await getProfile();
       if (!response?.data.data.user) {
          throw redirect('/login');
       }
       
       return response.data.data.user;
    },
    children: [
      {
        path: '', //localhost:4000/dashboard
        element: <DHome />,
      },
      {
        path: 'room', //localhost:4000/dashboard/room
        element: <DRoom />,
      },
    ],
  },
];

export default routeDashboard;
