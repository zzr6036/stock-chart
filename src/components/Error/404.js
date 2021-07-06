import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router'

const FourOFourPage = props => {
    const history = useHistory()
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, this page you visited does not exist"
            extra={
                <Button type="primary" onClick={() => history.replace('/home')}>
                    Back to home page
                </Button>
            }
        />
    )
}

export default FourOFourPage