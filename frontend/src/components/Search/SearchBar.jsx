// src/components/SearchBar.js
import React, { useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

const SearchBar = ({ query, setQuery, sources, setSource, onSearch }) => {

    const sourceSession = localStorage.getItem('domain')

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };
    const handleSourceSelect = (e) => {
        const source = e.target.value
        if (source) {
            setSource(source)
            localStorage.setItem('domain', source)
        }
    }

    useEffect(() => {
        if (!sourceSession) {
            setSource(sources[0])
        } else {
            setSource(sourceSession)
        }
    }, [sourceSession])

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
                <Col xs={12} md={3}>
                    <Form.Group controlId="checkInDate">
                        <Form.Control
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by story, novel name"
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="d-flex align-items-center">
                    <span className="mx-1">Source: </span>
                    <Form.Select onChange={handleSourceSelect}>
                        {sourceSession && (
                            <option value={sourceSession}>
                                {sourceSession}
                            </option>
                        )}
                        {sources.map((source, index) => {
                            if (source !== sourceSession) {
                                return (<option key={index} value={source}>
                                    {source}
                                </option>)
                            }
                        }
                        )}
                    </Form.Select>
                </Col>
                <Col xs={12} md={1} className="px-0">
                    <Button type="submit" className="btn-story mx-2">Search</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBar;
