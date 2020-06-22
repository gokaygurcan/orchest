import React from 'react';
import MDCButtonReact from '../mdc-components/MDCButtonReact';
import MDCSelectReact from '../mdc-components/MDCSelectReact';
import MDCTextFieldReact from '../mdc-components/MDCTextFieldReact';

class DataSourceEditView extends React.Component {

    componentWillUnmount() {

    }

    onSelectDataSourceType(value){
        this.setState({
            "dynamicForm": value
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            "dataSource": this.props.dataSource ? this.props.dataSource : {},
            "dynamicForm": this.props.dataSource ? this.props.dataSource.source_type : undefined,
            "formData":  {
                "host-directory": {
                    "groups": [
                        {
                            "name": "Directory details",
                            "fields": [
                                {
                                    "label": "Host path",
                                    "name": "host_path",
                                    "type": "textfield",
                                },
                            ]
                        }
                    ]
                },
                "database-mysql": {
                    "groups": [
                        {
                            "name": "Connection details",
                            "fields": [
                                {
                                    "label": "Host",
                                    "name": "host",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Database name",
                                    "name": "database_name",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Username",
                                    "name": "username",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Password",
                                    "name": "password",
                                    "type": "password",
                                }
                            ]
                        }
                    ]
                },
                "database-postgresql": {
                    "groups": [
                        {
                            "name": "Connection details",
                            "fields": [
                                {
                                    "label": "Host",
                                    "name": "host",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Database name",
                                    "name": "database_name",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Username",
                                    "name": "username",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Password",
                                    "name": "password",
                                    "type": "password",
                                }
                            ]
                        }
                    ]
                },
                "database-aws-redshift": {
                    "groups": [
                        {
                            "name": "Connection details",
                            "fields": [
                                {
                                    "label": "URL",
                                    "name": "url",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Username",
                                    "name": "username",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Password",
                                    "name": "password",
                                    "type": "password",
                                }
                            ]
                        }
                    ]
                },
                "database-aws-rds": {
                    "groups": [
                        {
                            "name": "Connection details",
                            "fields": [
                                {
                                    "label": "URL",
                                    "name": "url",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Username",
                                    "name": "username",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Password",
                                    "name": "password",
                                    "type": "password",
                                }
                            ]
                        }
                    ]
                },
                "objectstorage-aws-s3": {
                    "groups": [
                        {
                            "name": "Connection details",
                            "fields": [
                                {
                                    "label": "AWS Bucket name",
                                    "name": "AWS_BUCKET_NAME",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Access key",
                                    "name": "access_key",
                                    "type": "textfield",
                                },
                                {
                                    "label": "Secret key",
                                    "name": "secret_key",
                                    "type": "password",
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }    

    // TODO: work form generation into component separate from DataSourceEditView
    generateField(field){
        let elements = [];

        let prefill = undefined;

        try {
            prefill = this.state.dataSource.connection_details[field.name]
        } catch(e){
            console.log(e);
        }

        switch(field.type){
            case "textfield":
                elements.push(
                    <MDCTextFieldReact key={field.name} value={prefill} classNames={["push-down"]} label={field.label} />
                )
                break;
            case "password":
                    elements.push(
                        <MDCTextFieldReact value={prefill} key={field.name} classNames={["push-down"]} password={true} label={field.label} />
                    )
                    break;
            case "select":
                elements.push(
                    <MDCSelectReact value={prefill} classNames={["push-down"]} label={field.label} options={field.options} />
                )
                break;
        }

        return elements;
    }

    generateGroup(group){
        let elements = [];

        for(let x = 0; x < group.fields.length; x++){
            let field = group.fields[x];
            elements = elements.concat(this.generateField(field));
        }

        return elements;
    }

    generateDynamicForm(formData){
        let elements = [];

        for(let x = 0; x < formData.groups.length; x++){
            let group = formData.groups[x];

            elements.push(<h2 key={x} className="push-down">{group.name}</h2>);
            elements = elements.concat(this.generateGroup(group));
        }

        return elements;
    }



    changeValue(key, value){

        this.state.dataSource[key] = value;
        
        this.setState({
            dataSource: this.state.dataSource
        })
    }

    render() {

        let dynamicFormElements = undefined;

        if(this.state.dynamicForm !== undefined && this.state.dynamicForm.length > 0){
            dynamicFormElements = this.generateDynamicForm(this.state.formData[this.state.dynamicForm]);
        }

        return <div className={"view-page"}>
            <h2>Edit data source</h2>

            <form className="connection-form">
                <MDCTextFieldReact classNames={["push-down"]} label="Name" value={this.state.dataSource["name"]} onChange={this.changeValue.bind(this, "name")} />

                <MDCSelectReact onChange={this.onSelectDataSourceType.bind(this)} classNames={["push-down"]} label="Data source type" value={this.state.dynamicForm} options={[
                    ["host-directory", "Filesystem directory"],
                    ["database-mysql", "MySQL"],
                    ["database-postgresql", "PostgreSQL"],
                    ["database-aws-redshift", "AWS Redshift"],
                    ["database-aws-rds", "AWS RDS"],
                    ["objectstorage-aws-s3", "AWS S3"],
                ]} />

                {dynamicFormElements}

                <MDCButtonReact label="Save" icon="save" />
            </form>
            
        </div>;
    }
}

export default DataSourceEditView;