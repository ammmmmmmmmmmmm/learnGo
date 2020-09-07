package logger

import (
	"bytes"

	"github.com/sirupsen/logrus"
)

type LogFormatter struct {
}

func (l LogFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	var b *bytes.Buffer
	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}

	b.WriteString(entry.Time.Format("2006-01-02 15:04:05"))
	b.WriteByte(' ')
	b.WriteByte(' ')
	b.WriteByte('[')
	b.WriteString(entry.Level.String())
	b.WriteByte(']')
	b.WriteByte(' ')
	b.WriteByte(' ')
	b.WriteString(entry.Message)
	b.WriteByte('\r')
	b.WriteByte('\n')
	return b.Bytes(), nil
}
