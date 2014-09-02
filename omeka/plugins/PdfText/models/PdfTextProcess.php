<?php
/**
 * PDF Text
 * 
 * @copyright Copyright 2007-2012 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * @package Omeka\Plugins\PdfText
 */
class PdfTextProcess extends Omeka_Job_AbstractJob
{
    /**
     * Process all PDF files in Omeka.
     */
    public function perform()
    {
        $pdfTextPlugin = new PdfTextPlugin;
        $fileTable = $this->_db->getTable('File');

        $select = $this->_db->select()
            ->from($this->_db->File)
            ->where('mime_type IN (?)', $pdfTextPlugin->getPdfMimeTypes());

        // Iterate all PDF file records.
        $pageNumber = 1;
        while ($files = $fileTable->fetchObjects($select->limitPage($pageNumber, 50))) {
            foreach ($files as $file) {

                // Delete any existing PDF text element texts from the file.
                $textElement = $file->getElement(
                    PdfTextPlugin::ELEMENT_SET_NAME,
                    PdfTextPlugin::ELEMENT_NAME
                );
                $file->deleteElementTextsByElementId(array($textElement->id));

                // Extract the PDF text and add it to the file.
                $file->addTextForElement(
                    $textElement,
                    $pdfTextPlugin->pdfToText(FILES_DIR . '/original/' . $file->filename)
                );
                $file->save();

                // Prevent memory leaks.
                release_object($file);
            }
            $pageNumber++;
        }
    }
}
