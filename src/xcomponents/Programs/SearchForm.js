import React, {useState} from 'react';
import { InputGroup, Form, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
    careers,
    gradeLevels,
    enrollment,
    duration,
    eligibility,
    advanced
} from '../../shared/filters.js';
import '../../scss/search-form.scss';

export default function SearchForm(props) {
    /*{
        searchContent: '',
        CareerEmp: [],
        HasCost: false,
        Under18: false,
        HasTransport: false,
        HasShadow: false,
        GradeLevels: [] 
    }*/

    const caretIcon = <FontAwesomeIcon icon={faCaretDown} className='ml-2' />;
    const [buttonText, setButtonText] = useState('Select Filters')
    const [toggleFilters, setToggleFilters] = useState('d-none');

    const clickFilterButton = () => {
        if (toggleFilters === 'd-none') {
            // Display filters
            setButtonText('Hide Filters')
            setToggleFilters('');
        } else {
            // Hide filters
            setButtonText('Select Filters')
            setToggleFilters('d-none')
        }
    }

    const handleFormChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let newState = props.formData;

        if (name === 'CareerEmp' || name === 'GradeLevels') {
            // expects an array
            if (name === 'GradeLevels') value = parseInt(value);
            newState[name] = target.checked
                ? [...newState[name], value]    // add the item
                : newState[name].filter((item) => item !== value);  // remove the item
        } else if (target.type === 'checkbox') {
            // expects true or false
            newState[name] = target.checked;
        } else {
            // searchbar input
            newState[name] = value;
        }

        // console.log(newState[name]);
        props.setFormData(newState);
    };

    const resetForm = () => {
        Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
            .forEach( checkbox => checkbox.checked = false)
        
        props.setFormData(
            {
                searchContent: props.formData.searchContent,
                CareerEmp: [],
                HasCost: false,
                Under18: false,
                HasTransport: false,
                HasShadow: false,
                GradeLevels: []
            }
        );

        clickFilterButton();

    }

    return (
        <div className='search-form mb-4'>
           
            {/* Search by keyword */}
            <Form onSubmit={props.handleSubmit} className='keyword-search'>
                <Form.Group>
                    <Form.Label>Find a Career Path</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type='text'
                            name='searchContent'
                            placeholder='Search by keyword or location'
                            onChange={handleFormChange}
                        />
                        <InputGroup.Append>
                            <Button variant='primary' size='sm' type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>

            {/* Search by Location */}
            {/* <Form onSubmit={props.handleSubmit}>
                <Form.Group controlId='formLocation'>
                    <Form.Label>Location</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type='text'
                            placeholder='Zipcode or City, State'
                        />
                        <InputGroup.Append>
                            <Button variant='secondary' size='sm' type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form> */}

            {/* Filters */}
            <Button variant='secondary' onClick={clickFilterButton}>{buttonText}</Button>
            <Form onSubmit={props.handleSubmit} onReset={props.handleSubmit} className={toggleFilters} id='filtersForm'>
                <Accordion defaultActiveKey='0' className='pt-4'>
                    <Form.Group controlId='formEducation'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='0'>
                                Education Level{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='0'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {gradeLevels.map((grade, i) => {
                                    const options = props.formData.GradeLevels;
                                    return <Form.Check
                                        type='checkbox'
                                        name='GradeLevels'
                                        label={grade.name}
                                        value={grade.id}
                                        key={'grade' + i}
                                        onChange={handleFormChange}
                                        defaultChecked={ i === options[0] ? true : false }  // check the box if there are params in the URL
                                    />
                                })}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group controlId='formCareer'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='1'>
                                Career Emphasis{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='1'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {careers.map((career, i) => (
                                    <Form.Check
                                        type='checkbox'
                                        name='CareerEmp'
                                        label={career}
                                        value={career}
                                        key={'career' + i}
                                        onChange={handleFormChange}
                                    />
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group controlId='formEnrollment'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='2'>
                                Enrollment Fee{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='2'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {enrollment.map((cost, i) => (
                                    <Form.Check
                                        type='checkbox'
                                        name='HasCost'
                                        label={cost}
                                        key={'cost' + i}
                                        // value={cost}
                                        // onChange={handleFormChange}
                                    />
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group controlId='formDuration'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='3'>
                                Duration{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='3'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {duration.map((time, i) => (
                                    <Form.Check
                                        type='checkbox'
                                        name='Duration'
                                        label={time}
                                        key={'time' + i}
                                        // value={item}
                                        // onChange={handleFormChange}
                                    />
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group controlId='formEligibility'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='4'>
                                Eligibility{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='4'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {eligibility.map((item, i) => (
                                    <Form.Check
                                        type='checkbox'
                                        name='Eligibility'
                                        label={item}
                                        key={'eligible' + i}
                                        // value={item}
                                        // onChange={handleFormChange}
                                    />
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group controlId='formAdvanced'>
                        <Form.Label>
                            <Accordion.Toggle as={Form.Label} eventKey='5'>
                                Advanced Options{caretIcon}
                            </Accordion.Toggle>
                        </Form.Label>
                        <Accordion.Collapse eventKey='5'>
                            <div>
                                <Form.Check className='d-none'></Form.Check>
                                {advanced.map((item, i) => (
                                    <Form.Check
                                        type='checkbox'
                                        name='Advanced'
                                        label={item}
                                        key={'advanced' + i}
                                        // value={item}
                                        // onChange={handleFormChange}
                                    />
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Form.Group>
                </Accordion>

                <div className='text-center pt-3'>
                    <Button size='lg' variant='primary' type='submit' onClick={clickFilterButton} className='mx-2'>
                        Apply filters
                    </Button>
                    <Button type='reset' size='lg' variant='outline-primary' onClick={resetForm} className='mx-2'>Clear Filters</Button>
                </div>
            </Form>
        </div>
    );
}
