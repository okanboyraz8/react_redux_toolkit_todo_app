import { configureStore } from '@reduxjs/toolkit';

//authReducer yada todoReducer isimlerini biz uygunluk açısından böyle verdik!
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todo/todoSlice';

//A non-serializable value error: aslında bir hata değil, sadece payload verisinin serileştirilememesinden
//kaynaklanan bir durum var. Bunu dikkate almak bizim elimizde. Bu Uyarıyı dikkate almak istemiyorsak:

//Bir kontrol yapmamız gerekiyor. Bu kontrol ise "store.js" içinde yapıyoruz. Bir "middleware" oluşturup
//içini gerekli bilgilerle doldurup konsol kısmındaki uyarıyı "false" durumuna çekiyoruz...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
