import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/taskSlice';

const { Option } = Select;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
});

function TaskFormModal({ open, onClose, selectedDate, editingTask }) {
  const dispatch = useDispatch();

  const initialValues = editingTask || {
    title: '',
    description: '',
    date: selectedDate,
    category: '',
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={editingTask ? 'Edit Task' : 'Add Task'}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (editingTask) {
            dispatch(editTask({ ...values, id: editingTask.id }));
          } else {
            dispatch(addTask(values));
          }
          resetForm();
          onClose();
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              validateStatus={errors.title && touched.title ? 'error' : ''}
              help={touched.title && errors.title}
            >
              <Input name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Category" required>
              <Select
                name="category"
                value={values.category}
                onChange={value => handleChange({ target: { name: 'category', value } })}
              >
                <Option value="Completed">Completed</Option>
                <Option value="InProgress">InProgress</Option>
                <Option value="Urgent">Urgent</Option>
                <Option value="NotStarted">NotStarted</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingTask ? 'Update' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default TaskFormModal;
