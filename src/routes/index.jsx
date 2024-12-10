import { createBrowserRouter } from 'react-router-dom';
import Layout from 'pages/Layout';
import Home from 'pages/Home';
import QuestionList from 'pages/QuestionList';
import Feed from 'pages/Feed';
import Answer from 'pages/Answer';
import Error from 'pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'list', element: <QuestionList /> },
      {
        path: 'post/:id',
        children: [
          { index: true, element: <Feed /> },
          { path: 'answer', element: <Answer /> },
        ],
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
