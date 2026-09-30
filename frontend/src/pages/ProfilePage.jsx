import { useEffect, useState } from 'react';
import api from '../api/axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Ошибка при получении профиля', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Не удалось загрузить профиль.</div>;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя пользователя: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ProfilePage;
