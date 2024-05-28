import './ComplianceReport.css';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReportIcon from '@mui/icons-material/Report';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import InfoIcon from '@mui/icons-material/Info';

function ComplianceReport(props) {
    const report = props.report;
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <div className='section-header'>
                <InfoIcon className='icon-info' /><h3>&nbsp;Insight</h3>
            </div>
            <Typography>I analyzed the document for compliance with South African labour laws.
                Non-compliant and compliant sections are highlighted.
                For non-compliant sections, I provided explanations of the issues and added suggestions for improvements.</Typography>

            <div className='section-header'>
                <LocalPoliceIcon className='icon-rating' /><h3>&nbsp;Overall Rating</h3>
            </div>
            <Rating name="compliance-rating" defaultValue={report.overall_compliance_rating / 10} max={10} precision={0.1} readOnly />

            <div className='section-header'>
                <ReportIcon className='icon-non-compliant' /><h3>&nbsp;Non-Compliant</h3>
            </div>
            {report.non_compliant_sections.map((section, index) => (
                <Accordion className='accordion-non-compliant' expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={index}>
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
                            <strong>Source:</strong> <a className='link' rel='noreferrer' target='_blank' href={section.reference.link} > {section.reference.text}</a>
                        </Typography>
                        <Typography>
                            <strong>AI Suggestion:</strong> {section.suggested_alternative.text}
                        </Typography>
                        {section.suggested_alternative.link && <Typography>
                            <strong>AI Suggestion source:</strong> <a className='link' rel='noreferrer' target='_blank' href={section.suggested_alternative.link} >Reference</a>
                        </Typography>}

                    </AccordionDetails>
                </Accordion>
            ))}

            <div className='section-header'>
                <VerifiedIcon className='icon-compliant' /><h3>&nbsp;Compliant</h3>
            </div>
            {report.compliant_sections.map((section, index) => (
                <Accordion className='accordion-compliant' expanded={expanded === `panelb${index}`} onChange={handleChange(`panelb${index}`)} key={index}>
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