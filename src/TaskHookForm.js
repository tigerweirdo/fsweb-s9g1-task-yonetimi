import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const taskSchema = yup.object().shape({
  title: yup.string().required("Task başlığı yazmalısınız").min(3, "Task başlığı en az 3 karakter olmalı"),
  description: yup.string().required("Task açıklaması yazmalısınız").min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: yup.array().min(1, "Lütfen en az bir kişi seçin"),
});

export default function TaskHookForm({ kisiler, submitFn }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const onSubmit = (data) => {
    submitFn({ ...data, status: "yapılacak", id: Date.now() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input-group">
        <label htmlFor="title">Task Adı</label>
        <input type="text" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className="input-group">
        <label htmlFor="description">Açıklama</label>
        <textarea {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className="input-group">
        <label htmlFor="people">Sorumlu Kişiler</label>
        <Controller
          name="people"
          control={control}
          render={({ field }) => (
            <select {...field} multiple>
              {kisiler.map((kisi) => (
                <option key={kisi} value={kisi}>
                  {kisi}
                </option>
              ))}
            </select>
          )}
        />
        {errors.people && <p>{errors.people.message}</p>}
      </div>

      <button type="submit">Görevi Ekle</button>
    </form>
  );
}
