import React from 'react'
import ItemTask from './Item/ItemTask';

export default function TableTask({ users, handleDelete, handleUpdate }) {
    return (
        <table>
            <thead>
                <th>#</th>
                <th>Content</th>
                <th>Due date</th>
                <th>Status</th>
                <th>Assiged to</th>
                <th>Action</th>
            </thead>
            {
                users.map((item, index) => (
                    <ItemTask
                        key={item.id}
                        item={item}
                        index={index}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                ))
            }
        </table>
    )
}
