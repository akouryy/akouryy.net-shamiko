import React from 'react';
import '../styles/PageIndex.less';
import { BasePage } from '../components/BasePage';
import { Modal } from '../components/Modal';

const Home: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <BasePage canonical='/'>
      <main className='PageIndex'>
        <h1 className='PageIndex-Title'>akouryy.net</h1>
        <ul className='PageIndex-Menu'>
          <li className='PageIndex-MenuItem'>
            <a href='javascript:void(0)' onClick={() => setShowModal(true)}>
              profile
            </a>
          </li>
          <li className='PageIndex-MenuItem'>
            <a href='https://twitter.com/akouryy1'>contact</a>
          </li>
          <li className='PageIndex-MenuItem'>
            <a href='javascript:void(0)' onClick={() => setShowModal(true)}>
              other
            </a>
          </li>
        </ul>

        {showModal && (
          <Modal hider={setShowModal}>
            Coming sooner or later.
          </Modal>
        )}
      </main>
    </BasePage>
  );
};

export default Home;
