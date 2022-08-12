import React from 'react';
export const userColumns = [
    {
        field: "user_id",
        headerName: "Username",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.user_id}
                </div>
            );
        },
    },
    {
        field: "user_email_id",
        headerName: "Email",
        width: 230,
    },
];