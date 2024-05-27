import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ComplianceReport(props) {
    const report = props.report;
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <h3 className='section-header'>Overall Rating</h3>
            <Rating name="compliance-rating" defaultValue={report.overall_compliance_rating / 10} max={10} precision={0.1} readOnly />

            <h3 className='section-header'>Non-Compliant Sections</h3>
            {report.non_compliant_sections.map((section, index) => (
                <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography sx={{ width: '35%', flexShrink: 0, overflowWrap: 'break-word' }}>{section.section_title}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{section.non_compliant_text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography><strong>Explanation:</strong></Typography>
                        <Typography>{section.explanation}</Typography>
                        <Typography>
                            <strong>Source:</strong> <a className='link' href={section.reference.link} > {section.reference.text}</a>
                        </Typography>
                        <Typography>
                            <strong>AI Suggestion:</strong> {section.suggested_alternative.text}
                        </Typography>
                        {section.suggested_alternative.link && <Typography>
                            <strong>AI Suggestion source:</strong> <a className='link' href={section.suggested_alternative.link} >Reference</a>
                        </Typography>}

                    </AccordionDetails>
                </Accordion>
            ))}

            <h3 className='section-header'>Compliant Sections</h3>
            {report.compliant_sections.map((section, index) => (
                <Accordion expanded={expanded === `panelb${index}`} onChange={handleChange(`panelb${index}`)} key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header" >
                        <Typography sx={{ width: '35%', flexShrink: 0, overflowWrap: 'break-word' }}>
                            {section.section_title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{section.compliant_text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <strong>AI Insight:</strong> {section.positive_note}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export { ComplianceReport }